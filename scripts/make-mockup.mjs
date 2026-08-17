// Authoring tool — not part of the build.
//
// Generates a project-card mockup matching the style of the existing cards:
// an angled desktop browser window flanked by two phone frames on a dark
// gradient. Output is 1376x860 WebP, exactly the card's 16:10 frame, so it
// drops into src/assets/ with no cropping or padding.
//
//   npm i -D playwright sharp     # not shipped as project dependencies
//   node scripts/make-mockup.mjs <url> src/assets/<name>.webp [label]
//
// Uses the Chromium already present via PLAYWRIGHT_BROWSERS_PATH where set,
// otherwise Playwright's own download.
import { chromium } from "playwright";
import sharp from "sharp";
import { writeFileSync, readFileSync, unlinkSync } from "node:fs";

const [url, out, label = ""] = process.argv.slice(2);
if (!url || !out) {
  console.error("usage: node make-mockup.mjs <url> <out.webp> [label]");
  process.exit(1);
}

const CHROME = process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium";
const settle = async (p) => {
  await p.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += innerHeight * 0.8) {
      scrollTo(0, y); await new Promise(r => setTimeout(r, 200));
    }
    scrollTo(0, 0);
  });
  await p.waitForTimeout(1200);
};

const b = await chromium.launch(CHROME ? { executablePath: CHROME } : {});

const desk = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const dp = await desk.newPage();
await dp.goto(url, { waitUntil: "networkidle", timeout: 60000 });
await settle(dp);
const deskShot = await dp.screenshot();
await desk.close();

const mob = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
const mp = await mob.newPage();
await mp.goto(url, { waitUntil: "networkidle", timeout: 60000 });
await settle(mp);
const mobShot = await mp.screenshot();
await mob.close();

const b64 = (buf) => `data:image/png;base64,${buf.toString("base64")}`;
const host = new URL(url).host;

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:2000px; height:1250px; overflow:hidden;
    background:
      radial-gradient(ellipse 70% 60% at 20% 15%, rgba(120,90,220,0.30) 0%, transparent 60%),
      radial-gradient(ellipse 60% 55% at 85% 85%, rgba(40,120,200,0.22) 0%, transparent 60%),
      linear-gradient(150deg, #0c0f1e 0%, #0a0d1a 55%, #070a14 100%);
    font-family: system-ui, sans-serif; }
  .stage { position:absolute; inset:0; perspective:2600px; perspective-origin:50% 45%; }
  .rig { position:absolute; inset:0; transform-style:preserve-3d;
         transform: rotateX(6deg) rotateY(-19deg) rotateZ(1.5deg); }
  .browser { position:absolute; left:330px; top:190px; width:1240px;
    border-radius:14px; overflow:hidden; background:#14161f;
    box-shadow: 0 60px 120px -30px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.07);
    transform: translateZ(0px); }
  .bar { height:44px; background:#1b1e28; display:flex; align-items:center; gap:8px; padding:0 16px;
         border-bottom:1px solid rgba(255,255,255,0.06); }
  .dot { width:11px; height:11px; border-radius:50%; }
  .url { flex:1; margin-left:12px; height:26px; border-radius:7px; background:#0f1119;
         color:#8b93a7; font-size:13px; display:flex; align-items:center; padding:0 12px; }
  .browser img { display:block; width:100%; }
  .phone { position:absolute; border-radius:42px; background:#0a0b10; padding:9px;
    box-shadow: 0 50px 100px -25px rgba(0,0,0,0.9), 0 0 0 1.5px rgba(255,255,255,0.13); }
  .phone img { display:block; width:100%; border-radius:34px; }
  .phone .notch { position:absolute; top:20px; left:50%; transform:translateX(-50%);
    width:96px; height:26px; border-radius:14px; background:#0a0b10; z-index:2; }
  .p-left  { left:120px;  top:430px; width:300px; transform: translateZ(160px) rotateY(3deg); }
  .p-right { right:110px; top:330px; width:320px; transform: translateZ(210px) rotateY(-2deg); }
</style></head><body>
  <div class="stage"><div class="rig">
    <div class="browser">
      <div class="bar">
        <span class="dot" style="background:#ff5f57"></span>
        <span class="dot" style="background:#febc2e"></span>
        <span class="dot" style="background:#28c840"></span>
        <div class="url">&#128274;&nbsp; ${host}</div>
      </div>
      <img src="${b64(deskShot)}">
    </div>
    <div class="phone p-left"><div class="notch"></div><img src="${b64(mobShot)}"></div>
    <div class="phone p-right"><div class="notch"></div><img src="${b64(mobShot)}"></div>
  </div></div>
</body></html>`;

const tmp = `${out}.compose.html`;
writeFileSync(tmp, html);

const cp = await b.newContext({ viewport: { width: 2000, height: 1250 }, deviceScaleFactor: 1 });
const page = await cp.newPage();
await page.goto("file://" + tmp);
await page.waitForTimeout(1200);
const composed = await page.screenshot();
await cp.close();
await b.close();
unlinkSync(tmp);

await sharp(composed).resize({ width: 1376 }).webp({ quality: 84, effort: 6 }).toFile(out);
const meta = await sharp(out).metadata();
console.log(`${label || host}: ${meta.width}x${meta.height}  ${(readFileSync(out).length/1024).toFixed(0)}KB`);
