import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { stripVTControlCharacters } from 'node:util';

const require = createRequire(import.meta.url);
const [, , target, command, ...args] = process.argv;
if ((target !== 'next' && target !== 'storybook') || (command !== 'build' && command !== 'dev')) {
  throw new Error('Expected a Next.js or Storybook build or dev command.');
}

const manifestPath = require.resolve(`${target}/package.json`);
const { bin } = require(manifestPath);
const cli = join(dirname(manifestPath), typeof bin === 'string' ? bin : bin[target]);
// Storybook 10 registers its internal TypeScript loader through Node's deprecated module.register.
const flags = target === 'storybook' ? ['--disable-warning=DEP0205'] : [];
const isBuild = command === 'build';
const child = spawn(process.execPath, [...flags, cli, command, ...args], {
  stdio: isBuild ? ['inherit', 'pipe', 'pipe'] : 'inherit',
});

let foundWarning = false;
function watch(stream, destination) {
  let pending = '';
  const warning =
    /^\s*[│┃]?\s*(?:⚠|▲\s+Vite\b|\[WARN(?:ING)?\]|\(!\)|WARN(?:ING)?\b|.+\bWarning\s+\[[\w-]+\]|\(node:\d+\)\s+(?:\[[^\]]+\]\s+)?\w*Warning\b)/i;
  const check = (line) => {
    if (warning.test(stripVTControlCharacters(line))) foundWarning = true;
  };

  stream.setEncoding('utf8');
  stream.on('data', (chunk) => {
    destination.write(chunk);
    const lines = (pending + chunk).split(/[\r\n]/);
    pending = lines.pop();
    for (const line of lines) check(line);
  });
  stream.on('end', () => check(pending));
}

if (isBuild) {
  watch(child.stdout, process.stdout);
  watch(child.stderr, process.stderr);
}
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => child.kill(signal));

child.on('error', (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
child.on('close', (code) => {
  if (code !== 0) {
    process.exitCode = code ?? 1;
  } else if (foundWarning) {
    console.error('Build emitted warnings. Resolve them before continuing.');
    process.exitCode = 1;
  }
});
