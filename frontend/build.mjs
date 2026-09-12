// Bundles the card into a single, dependency-free JS file for Home Assistant.
import * as esbuild from "esbuild";
import { mkdirSync } from "node:fs";

const watch = process.argv.includes("--watch");

mkdirSync("dist", { recursive: true });

const options = {
  entryPoints: ["src/family-planner-card.ts"],
  bundle: true,
  outfile: "dist/family-planner-card.js",
  format: "iife",
  target: "es2021",
  minify: !watch,
  sourcemap: true,
  legalComments: "none",
};

if (watch) {
  const ctx = await esbuild.context(options);
  await ctx.watch();
  console.log("Watching for changes...");
} else {
  await esbuild.build(options);
  console.log("Built dist/family-planner-card.js");
}
