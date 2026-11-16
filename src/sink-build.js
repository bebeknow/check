// 고객 페이지 조립: head(스타일·본문) + script. 목록은 넣지 않는다(경쟁사 유출 방지, 서버 ?sink=find). 실행: node sink-build.js <outDir> <version>
const fs = require('fs'), path = require('path');
const D = __dirname, [OUT, VER] = process.argv.slice(2);
let head = fs.readFileSync(path.join(D, 'sink-head.html'), 'utf8');
const css = `  .req { display: grid; gap: 10px; margin-top: 14px; text-align: left; }
  .req label { display: grid; gap: 4px; font-size: 13px; color: var(--ink2); }
  .req input, .req select { font-size: 16px; padding: 11px 12px; border: 1px solid var(--line); border-radius: 10px; background: #fff; color: var(--ink); width: 100%; }
  .req .agree { display: flex; align-items: center; gap: 8px; font-size: 13px; }
  .req .agree input { width: 20px; height: 20px; padding: 0; flex: 0 0 auto; }
  .req button { padding: 13px; border: 0; border-radius: 12px; background: var(--brand); color: #fff; font-size: 16px; font-weight: 700; cursor: pointer; }
  .req button:disabled { opacity: .6; }
  .rmsg { margin: 0; font-size: 13px; color: #b3261e; min-height: 1em; }
`;
if (!head.includes('.req {')) head = head.replace('  footer { text-align: center;', css + '  footer { text-align: center;');
head = head.replace(/v2026\.\d+\.\d+-\d+<\/footer>/, VER + '</footer>');
let script = fs.readFileSync(path.join(D, 'sink-script.html'), 'utf8');   // v63: 목록은 넣지 않음 (서버에서 품번 찾기)
const html = head + script;
new Function(html.match(/<script>([\s\S]*)<\/script>/)[1]); // 문법 검사만
fs.writeFileSync(path.join(OUT, 'index.html'), html);
console.log('ok', html.length);
