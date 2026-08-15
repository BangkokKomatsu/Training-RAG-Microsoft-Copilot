// Usage: node shot.js <file.html> <outprefix> [fullpage=1]
// Requires the "playwright" npm package (not bundled — install separately
// with `npm install playwright` if you want to use this QA helper).
const path = require('path');
let chromium;
try {
  ({ chromium } = require('playwright'));
} catch (e) {
  console.error('Playwright not found. Run "npm install playwright" first.');
  process.exit(1);
}

(async () => {
  const file = process.argv[2];
  const outPrefix = process.argv[3] || 'shot';
  const fullPage = process.argv[4] !== '0';
  const abs = path.resolve(file);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto('file://' + abs, { waitUntil: 'networkidle' });
  await page.screenshot({ path: outPrefix + '.png', fullPage });
  await browser.close();
  console.log('Saved', outPrefix + '.png');
})();
