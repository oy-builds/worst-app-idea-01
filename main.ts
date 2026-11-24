// The Worst App Idea Ever Pitched — make.fun entry
// (u-plucky-sparrow-67-the-worst-app-idea-ever-pitched-a0396b23).
// Writes one sentence pitching the worst, most useless app imaginable to
// $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt).
// Gate: UTF-8 text, 1 to 240 characters, not only whitespace, one sentence.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "FridgeLight is the app that pings you every time your fridge light turns on and sends a weekly digest of your leftovers' hours in the dark, because your food deserves an audience and you deserve to know.";

function validate(line: string): void {
  if (line.length < 1 || line.length > 240) {
    throw new Error(`entry must be 1-240 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (line !== line.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if ((line.match(/\./g) ?? []).length !== 1) {
    throw new Error("entry must be exactly one sentence");
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");
validate(LINE);
mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, LINE, "utf8");

// Read back and verify byte-identical output.
const back = readFileSync(outFile, "utf8");
if (back !== LINE) {
  throw new Error("read-back mismatch: entry.txt differs from the entry line");
}
console.log(`wrote ${outFile} (${LINE.length} chars)`);
