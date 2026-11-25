import { cpSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';

const { values, positionals } = parseArgs({
  options: {
    port: { type: 'string', short: 'p' },
    hostname: { type: 'string', short: 'H' },
    keepAliveTimeout: { type: 'string' },
    help: { type: 'boolean', short: 'h' },
  },
  allowPositionals: true,
});

if (values.help) {
  console.log(
    'Usage: pnpm start [directory] [-p, --port <port>] [-H, --hostname <hostname>] [--keepAliveTimeout <ms>]'
  );
  process.exit(0);
}
if (positionals.length > 1) throw new Error('Expected at most one application directory.');

const root = resolve(positionals[0] ?? '.');
const standalone = join(root, '.next', 'standalone');
const server = join(standalone, 'server.js');
if (!existsSync(server)) throw new Error('Production build missing. Run pnpm build first.');

const port = values.port ?? process.env.PORT;
if (port !== undefined) {
  if (!/^\d+$/.test(port) || Number(port) < 1 || Number(port) > 65535)
    throw new Error('Expected a port from 1 to 65535.');
  process.env.PORT = port;
}
if (values.hostname !== undefined) process.env.HOSTNAME = values.hostname;
if (values.keepAliveTimeout !== undefined) {
  if (!/^\d+$/.test(values.keepAliveTimeout) || !Number.isSafeInteger(Number(values.keepAliveTimeout))) {
    throw new Error('Expected a non-negative integer keep-alive timeout.');
  }
  process.env.KEEP_ALIVE_TIMEOUT = values.keepAliveTimeout;
}

// Next.js leaves these assets outside the standalone output for deployments that use a CDN.
cpSync(join(root, '.next', 'static'), join(standalone, '.next', 'static'), { recursive: true });
const publicDir = join(root, 'public');
if (existsSync(publicDir)) cpSync(publicDir, join(standalone, 'public'), { recursive: true });

await import(pathToFileURL(server).href);
