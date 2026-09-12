import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { Interface } from 'quais';
import { CONTRACT_ABIS } from '@daoships/sdk';

if (!process.argv[2]) throw new Error('Usage: node scripts/sync-cli-docs.mjs /path/to/installed/cli/dist/bin.js');
const { stdout } = await promisify(execFile)(process.execPath, ['--', resolve(process.argv[2]), '--schema'], { maxBuffer: 4 * 1024 * 1024 });
const schema = JSON.parse(stdout);
if (schema.schemaVersion !== 1 || schema.name !== 'daoships' || !Array.isArray(schema.commands)) throw new Error('Unknown CLI schema.');
await writeFile(new URL('../public/cli-schema.json', import.meta.url), JSON.stringify(schema, null, 2) + '\n');
const escape = text => String(text).replaceAll('|', '\\|');
const lines = [
  'export const metadata = { title: "CLI command reference", description: "Every DAO Ships CLI command, its arguments and contract coverage." };', '',
  '# CLI command reference', '',
  `Generated from **@daoships/cli@${schema.version}**. The one-shot CLI and TUI use this same registry.`, '',
  '[CLI guide](/docs/developers/cli) · [Machine-readable schema](/cli-schema.json) · [Coverage and limits](/docs/developers/coverage)', '',
  'Global flags can appear before or after commands. `<field>` is required; `[field]` is optional. JSON fields accept inline JSON or `@file.json`. Writes preview by default; sending requires the execution flags described in the CLI guide.', '',
  '| Command | Effect | Purpose |', '| --- | --- | --- |',
  ...schema.commands.map(c => `| \`${c.path}${c.fields.map(f => ` ${f.optional ? '[' : '<'}${f.name}${f.optional ? ']' : '>'}`).join('')}\` | ${c.effect} | ${escape(c.description)} |`), '',
  '## Contract methods', '',
  'Use `contract methods <kind>` for all canonical signatures, argument types and overloads. `contract events <kind>` lists event signatures. The navigator aliases expose the same methods for all eight built-in navigator types.', '',
  '| Contract | Reads | Writes |', '| --- | ---: | ---: |',
  ...Object.entries(CONTRACT_ABIS).map(([kind, abi]) => {
    const methods = new Interface(abi).fragments.filter(f => f.type === 'function');
    const reads = methods.filter(f => ['view', 'pure'].includes(f.stateMutability)).length;
    return `| ${kind} | ${reads} | ${methods.length - reads} |`;
  }), '',
];
await mkdir(new URL('../app/docs/developers/cli-reference/', import.meta.url), { recursive: true });
await writeFile(new URL('../app/docs/developers/cli-reference/page.mdx', import.meta.url), lines.join('\n'));
console.log(`Synchronized ${schema.commands.length} commands from CLI ${schema.version}.`);
