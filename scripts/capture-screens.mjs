/**
 * One-off screenshot capture for the public case-study repo.
 * Run from Tadbir root while the app is serving:
 *   node ../tadbir-case-study/scripts/capture-screens.mjs
 */
import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "docs", "screenshots");
const base = process.env.TADBIR_URL || "http://localhost:3001";

const pages = [
  { slug: "01-dashboard", path: "/" },
  { slug: "02-setup-guide", path: "/setup-guide" },
  { slug: "03-settings", path: "/settings" },
  { slug: "04-ai-assistant", path: "/ai-assistant" },
  { slug: "05-reports", path: "/reports" },
  { slug: "06-knowledge-base", path: "/knowledge-base" },
  { slug: "07-queues", path: "/queues" },
];

fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  colorScheme: "dark",
  deviceScaleFactor: 2,
});
const page = await context.newPage();

for (const p of pages) {
  const url = `${base}${p.path}`;
  console.log("Capturing", url);
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(800);
  const file = path.join(outDir, `${p.slug}.png`);
  await page.screenshot({ path: file, fullPage: false });
  console.log("  ->", file);
}

// Full-page setup guide for the write-up
await page.goto(`${base}/setup-guide`, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(600);
await page.screenshot({
  path: path.join(outDir, "02-setup-guide-full.png"),
  fullPage: true,
});

await browser.close();
console.log("Done.");
