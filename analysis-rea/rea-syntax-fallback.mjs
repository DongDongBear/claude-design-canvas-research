// REA 已发布的 parser/traversal 原语；只保留语法事实，不执行目标代码。
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { basename, resolve } from 'node:path';
import { parseJavaScriptSource } from './npm-package/package/dist/domain/javascript/javascriptSourceParser.js';
import { traverseJavaScriptAst } from './npm-package/package/dist/domain/javascript/javascriptSemanticTraversal.js';

const sha256 = value => createHash('sha256').update(value).digest('hex');
const nameOf = node => {
  if (!node) return '';
  if (node.type === 'Identifier') return node.name;
  if (node.type === 'StringLiteral') return JSON.stringify(node.value);
  if (node.type === 'MemberExpression' || node.type === 'OptionalMemberExpression')
    return `${nameOf(node.object)}.${node.computed ? `[${nameOf(node.property)}]` : nameOf(node.property)}`;
  return `[${node.type}]`;
};
const interestingString = /(?:canvas|artboard|srcdoc|iframe|replica|design_canvas|design-canvas|zoom|postMessage|render|view-state|canvas\.json)/i;
const interestingCall = /(?:postMessage|addEventListener|removeEventListener|fetch|Worker|Blob|createObjectURL|revokeObjectURL|createElement|attachShadow|DOMParser|Function|eval|querySelector|MutationObserver|ResizeObserver)$/;
const results = [];
for (const arg of process.argv.slice(2)) {
  const path = resolve(arg), bytes = await readFile(path), source = bytes.toString('utf8');
  const started = performance.now(), ast = parseJavaScriptSource(source, path);
  const r = {path, bytes: bytes.length, sha256: sha256(bytes), parser: 'REA 6.7.0 parseJavaScriptSource (@babel/parser 8.0.4)',
    analysis_kind: 'syntax-only-fallback-not-public-cli-evidence', target_executed: false,
    parsed: ast !== null, parser_errors: ast?.errors?.map(e => e.message) ?? [], ast_nodes: 0,
    imports: [], exports: [], classes: [], calls: [], relevant_strings: [], embedded_strings: []};
  if (ast) traverseJavaScriptAst(ast, {enter(node) {
    r.ast_nodes++;
    const loc = {start_utf16: node.start, end_utf16: node.end, line: node.loc?.start.line, column_utf16: node.loc?.start.column};
    if (node.type === 'ImportDeclaration') r.imports.push({specifier: node.source.value, ...loc});
    if (node.type === 'ImportExpression') r.imports.push({specifier: node.source?.type === 'StringLiteral' ? node.source.value : null, expression: source.slice(node.start, node.end), dynamic: true, ...loc});
    if (node.type === 'ExportNamedDeclaration') r.exports.push({specifiers: node.specifiers.map(s => ({local: nameOf(s.local), exported: nameOf(s.exported)})), source: node.source?.value ?? null, ...loc});
    if (node.type === 'ClassDeclaration' || node.type === 'ClassExpression') r.classes.push({name: node.id?.name ?? null, super_class: nameOf(node.superClass), ...loc});
    if (node.type === 'CallExpression' || node.type === 'NewExpression') {
      const callee = nameOf(node.callee);
      if (interestingCall.test(callee)) r.calls.push({callee, expression: source.slice(node.start, Math.min(node.end, node.start + 600)), truncated: node.end - node.start > 600, ...loc});
    }
    if (node.type === 'StringLiteral') {
      if (node.value.length > 10000) r.embedded_strings.push({utf16_length: node.value.length, sha256_utf8: sha256(node.value), prefix: node.value.slice(0,120), ...loc});
      else if (interestingString.test(node.value)) r.relevant_strings.push({value: node.value, ...loc});
    }
  }});
  r.duration_seconds = (performance.now() - started) / 1000;
  await writeFile(`syntax-${basename(path)}.json`, JSON.stringify(r, null, 2) + '\n');
  results.push({path: r.path, sha256: r.sha256, bytes: r.bytes, parsed: r.parsed, parser_errors: r.parser_errors,
    ast_nodes: r.ast_nodes, imports: r.imports.length, exports: r.exports.length, classes: r.classes.length,
    interesting_calls: r.calls.length, relevant_strings: r.relevant_strings.length, embedded_strings: r.embedded_strings.length,
    duration_seconds: r.duration_seconds});
}
await writeFile('syntax-summary.json', JSON.stringify(results, null, 2) + '\n');
process.stdout.write(JSON.stringify(results, null, 2) + '\n');
