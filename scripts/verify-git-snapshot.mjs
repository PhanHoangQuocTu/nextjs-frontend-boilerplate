import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, sep } from 'node:path';

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { encoding: 'utf8', stdio: 'inherit', ...options });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`${[command, ...args].join(' ')} failed (${result.signal ?? result.status}).`);
  }
  return result.stdout?.trim();
}

const git = (args, options) => run('git', args, { stdio: ['ignore', 'pipe', 'inherit'], ...options });
const snapshotEnv = { ...process.env, HUSKY: '0' };
for (const name of git(['rev-parse', '--local-env-vars']).split('\n')) delete snapshotEnv[name];

// cmd.exe is only needed when pnpm was installed via npm on Windows.
const pnpm = (args, cwd) =>
  process.platform === 'win32'
    ? run('cmd.exe', ['/d', '/c', 'pnpm', ...args], { cwd, env: snapshotEnv })
    : run('pnpm', args, { cwd, env: snapshotEnv });

function verifySnapshot(commit) {
  const directory = mkdtempSync(join(tmpdir(), 'frontend-verify-'));
  const workingTree = join(directory, 'tree');

  try {
    let indexEnv = process.env;
    if (commit) {
      indexEnv = { ...process.env, GIT_INDEX_FILE: join(directory, 'index') };
      git(['read-tree', commit], { env: indexEnv });
    }
    // Git expects forward slashes in checkout-index prefixes on Windows too.
    git(['checkout-index', '--all', `--prefix=${workingTree.split(sep).join('/')}/`], { env: indexEnv });
    console.log(`Verifying ${commit ?? 'staged files'} in an isolated checkout.`);
    pnpm(['install', '--frozen-lockfile', '--prefer-offline'], workingTree);
    pnpm(['verify'], workingTree);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

try {
  const mode = process.argv[2];
  if (mode === 'staged') {
    verifySnapshot();
  } else if (mode === 'outgoing') {
    const commits = new Set();
    for (const line of readFileSync(0, 'utf8').trim().split('\n')) {
      if (!line) continue;
      const [, objectId] = line.split(/\s+/);
      if (!/^0+$/.test(objectId)) commits.add(git(['rev-parse', '--verify', `${objectId}^{commit}`]));
    }
    for (const commit of commits) verifySnapshot(commit);
  } else {
    throw new Error('Expected either staged or outgoing verification.');
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
