// Bundles the card into a single, dependency-free JS file for Home Assistant.
import * as esbuild from "esbuild";
import { mkdirSync } from "node:fs";

const watch = process.argv.includes("--watch");

mkdirSync("dist", { recursive: true });

const options = {
  entryPoints: ["src/homeroster-card.ts"],
  bundle: true,
  outfile: "dist/homeroster-card.js",
  format: "iife",
  target: "es2021",
  minify: !watch,
  sourcemap: true,
  // "eof": preserves every bundled dependency's license comment (just Lit's,
  // currently - see THIRD-PARTY-NOTICES.md) by appending them once at the
  // end of the output file, rather than stripping them ("none") or leaving
  // one inline per occurrence throughout the minified code ("inline").
  // Redistributing Lit's source bundled into this file without its
  // BSD-3-Clause notice attached would not satisfy that license's terms.
  legalComments: "eof",
};

if (watch) {
  const ctx = await esbuild.context(options);
  await ctx.watch();
  console.log("Watching for changes...");
} else {
  await esbuild.build(options);
  console.log("Built dist/homeroster-card.js");
}
