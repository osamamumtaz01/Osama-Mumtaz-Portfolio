// Injects the app's rendered markup into dist/index.html at build time.
//
// Without this the served HTML body is just <div id="root"></div>. Google can
// render JavaScript, but most AI crawlers (GPTBot, ClaudeBot, PerplexityBot)
// do not, so the entire site would be invisible to them.
import { readFileSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const templatePath = resolve(root, "dist/index.html");
const serverEntry = resolve(root, "dist-ssr/entry-server.js");

if (!existsSync(serverEntry)) {
  console.error(
    `[prerender] missing ${serverEntry} — run the SSR build before this script.`
  );
  process.exit(1);
}

const { render } = await import(pathToFileURL(serverEntry).href);
const appHtml = render();

if (!appHtml || appHtml.length < 500) {
  console.error(
    `[prerender] rendered markup looks empty (${appHtml.length} chars). Aborting so a broken build is not published.`
  );
  process.exit(1);
}

const template = readFileSync(templatePath, "utf-8");
const marker = '<div id="root"></div>';

if (!template.includes(marker)) {
  console.error(`[prerender] could not find ${marker} in dist/index.html.`);
  process.exit(1);
}

writeFileSync(
  templatePath,
  template.replace(marker, `<div id="root">${appHtml}</div>`)
);

// The SSR bundle is a build artefact, not something to deploy.
rmSync(resolve(root, "dist-ssr"), { recursive: true, force: true });

console.log(
  `[prerender] injected ${appHtml.length.toLocaleString()} chars of static markup into dist/index.html`
);
