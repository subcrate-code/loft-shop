import fs from 'fs';
import path from 'path';
import ts from '/opt/nvm/versions/node/v22.16.0/lib/node_modules/typescript/lib/typescript.js';

const root = process.cwd();
const exts = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.json'];
const files = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === '.git') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(ts|tsx|js|jsx|mjs)$/.test(entry.name)) files.push(full);
  }
}

function resolveImport(fromFile, spec) {
  let base;
  if (spec.startsWith('@/')) base = path.join(root, spec.slice(2));
  else if (spec.startsWith('.')) base = path.resolve(path.dirname(fromFile), spec);
  else return true;

  const candidates = [base, ...exts.map((ext) => base + ext), ...exts.map((ext) => path.join(base, 'index' + ext))];
  return candidates.some((candidate) => fs.existsSync(candidate));
}

walk(root);
const problems = [];

for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, file.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  for (const diagnostic of source.parseDiagnostics) {
    const { line, character } = source.getLineAndCharacterOfPosition(diagnostic.start || 0);
    problems.push(`${path.relative(root, file)}:${line + 1}:${character + 1} ${ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')}`);
  }

  const importRegex = /from\s+["']([^"']+)["']|import\s+["']([^"']+)["']/g;
  for (const match of text.matchAll(importRegex)) {
    const spec = match[1] || match[2];
    if (!resolveImport(file, spec)) {
      problems.push(`${path.relative(root, file)} unresolved import: ${spec}`);
    }
  }
}

if (problems.length) {
  console.error('VALIDATION FAILED');
  for (const problem of problems) console.error(problem);
  process.exit(1);
}

console.log(`Validated ${files.length} source files. No parse or import resolution errors found.`);
