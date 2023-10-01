#!/usr/bin/env node

import * as lib from "./lib.js";

if (process.env.WORDS) {
  lib.setWords(process.env.WORDS);
}
if (process.env.WORDS2) {
  lib.appendWords(process.env.WORDS2);
}

const argv = process.argv.slice(2);

const res = lib.lint(...argv);
reporter(res);

function reporter(results = []) {
  if (results.length) {
    process.exitCode = 1;
  }
  for (const { file, matches } of results) {
    for (const match of matches) {
      console.error(`[${file}] ${match}`);
    }
  }
}
