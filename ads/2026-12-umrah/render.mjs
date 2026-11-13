// Renders creative.html into the four PNGs Meta needs, using headless Edge/Chrome.
// Run from the repo root:  node ads/2026-12-umrah/render.mjs
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const browser = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
].find(existsSync);
if (!browser) throw new Error("Edge or Chrome not found");

const sizes = { feed: [1080, 1350], story: [1080, 1920] };
for (const v of ["a", "b"]) {
  for (const [s, [w, h]] of Object.entries(sizes)) {
    const out = join(here, `rahath-dec-jan-${v}-${s}.png`);
    const url = `${pathToFileURL(join(here, "creative.html")).href}?v=${v}&s=${s}`;
    execFileSync(browser, [
      "--headless=new", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files",
      "--force-device-scale-factor=1", "--virtual-time-budget=6000",
      `--window-size=${w},${h}`, `--screenshot=${out}`, url,
    ], { stdio: "ignore" });
    console.log("rendered", out);
  }
}
