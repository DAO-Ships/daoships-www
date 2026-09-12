import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { Interface } from 'quais';
import { CONTRACT_ABIS, indexerShapes, NAVIGATOR_KINDS } from '@daoships/sdk';

const root = fileURLToPath(new URL('../', import.meta.url));
const sdk = JSON.parse(await readFile(new URL('../package.json', import.meta.resolve('@daoships/sdk')), 'utf8'));
const schema = JSON.parse(await readFile(join(root, 'public/cli-schema.json'), 'utf8'));
assert.equal(sdk.version, '0.1.0-alpha.3');
assert.equal(schema.version, '0.1.0-alpha.2');
assert.equal(schema.commands.length, 88);
assert.equal(new Set(schema.commands.map(c => c.path)).size, 88);
assert.ok(schema.flags.includes('--key-env-file') && !schema.flags.includes('--env-file'));
const interfaces = Object.values(CONTRACT_ABIS).map(abi => new Interface(abi));
assert.equal(interfaces.length, 17);
assert.equal(interfaces.flatMap(i => i.fragments.filter(f => f.type === 'function')).length, 353);
assert.equal(interfaces.flatMap(i => i.fragments.filter(f => f.type === 'event')).length, 103);
assert.equal(NAVIGATOR_KINDS.length, 8);
assert.equal(Object.keys(indexerShapes).length, 25);

async function walk(path) {
  const found = [];
  for (const entry of await readdir(path, { withFileTypes: true })) {
    const target = join(path, entry.name);
    if (entry.isDirectory()) found.push(...await walk(target));
    else if (/\.(mdx|tsx|ts)$/.test(entry.name)) found.push(target);
  }
  return found;
}
const files = [...await walk(join(root, 'app/docs')), join(root, 'lib/docs.ts')];
const routes = new Set();
for (const file of files) {
  const source = await readFile(file, 'utf8');
  for (const match of source.matchAll(/(?:\]\(|href[=:]\s*["'])(\/docs(?:\/[a-z0-9-]+)*)(?:#[^\s)"']*)?(?:[)"'])/g)) routes.add(match[1]);
}
for (const route of routes) {
  const base = join(root, 'app', route);
  assert.ok(await stat(join(base, 'page.mdx')).catch(() => stat(join(base, 'page.tsx'))).catch(() => null), `Missing documentation route: ${route}`);
}

// Extract the displayed examples themselves; importing the SDK catches stale names,
// signatures and argument types without executing RPC calls or signing transactions.
await mkdir(join(root, 'node_modules/.cache'), { recursive: true });
const temporary = await mkdtemp(join(root, 'node_modules/.cache/daoships-docs-'));
try {
  const examples = [];
  for (const page of ['sdk', 'launch-from-typescript']) {
    const source = await readFile(join(root, 'app/docs/developers', page, 'page.mdx'), 'utf8');
    let index = 0;
    for (const match of source.matchAll(/^```ts\s*\n([\s\S]*?)^```/gm)) {
      const path = join(temporary, `${page}-${++index}.mts`);
      await writeFile(path, match[1] + '\nexport {};\n');
      examples.push(path);
    }
  }
  assert.ok(examples.length >= 6, 'Expected the SDK and launch examples.');
  const program = ts.createProgram(examples, {
    noEmit: true, strict: true, target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.NodeNext, moduleResolution: ts.ModuleResolutionKind.NodeNext,
    skipLibCheck: false, types: ['node'],
  });
  const diagnostics = ts.getPreEmitDiagnostics(program);
  if (diagnostics.length) throw new Error(ts.formatDiagnosticsWithColorAndContext(diagnostics, {
    getCanonicalFileName: f => f, getCurrentDirectory: () => root, getNewLine: () => '\n',
  }));
  const reference = await readFile(join(root, 'app/docs/developers/cli-reference/page.mdx'), 'utf8');
  for (const command of schema.commands) assert.ok(reference.includes('`' + command.path), `Missing CLI command: ${command.path}`);
  console.log(`Docs verified: ${examples.length} SDK examples, ${routes.size} internal routes, 88 CLI commands, 353 functions and 103 events.`);
} finally { await rm(temporary, { recursive: true, force: true }); }
