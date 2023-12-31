import fs from "node:fs";
import path from "node:path";
import d from "debug";
import fg from "fast-glob";
import inclusive from "@11ty/eleventy-plugin-inclusive-language/inclusive-language.js";

const debug = d("inclusive");

export let WORDS =
  "simply,obviously,basically,of course,clearly,just,everyone knows,however,easy".split(
    ",",
  );

export function setWords(words = []) {
  WORDS = normalizeList(words);
  debug("setWords = %o", WORDS);
}

export function appendWords(words = []) {
  WORDS = WORDS.concat(normalizeList(words));
  debug("appendWords = %o", WORDS);
}

export function lint(...globs) {
  debug("globs = %o", globs);
  return globs.reduce((acc, g) => {
    const files = fg.globSync(path.join(process.cwd(), g));
    debug("files = %o", files);
    for (const f of files) {
      const contents = fs.readFileSync(f, "utf-8");
      const file = path.relative(process.cwd(), f);
      const matches = inclusive(contents, WORDS).flatMap((m) =>
        m.split("\n").filter((l) => l.includes("\x1B[")),
      );
      acc = acc.concat({ file, matches });
    }
    return acc;
  }, []);
}

function normalizeList(words = []) {
  if (typeof words === "string") {
    return words.split(",").map(w => w.trim());
  }
  return words;
}
