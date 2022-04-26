import { readdir, readFile, stat } from "fs/promises";
import { from, share, lastValueFrom } from "rxjs";
import { tap, mergeMap, filter, toArray } from "rxjs/operators";
import { join } from "path";

import { parse } from "./markdown";

const isHidden = (path: string): boolean => /^\./.test(path);

async function* files(root: string) {
  const stack = [root];
  while (stack.length) {
    const dir = stack.pop();
    if (typeof dir !== "string") continue;

    for (const fsi of await readdir(dir, { withFileTypes: true })) {
      // Files starting with a period ('.') are hidden by convention.
      // These folders tend to include files that are not to be used
      // as content, and should thus be ignored.
      if (isHidden(fsi.name)) continue;

      const path = join(dir, fsi.name);

      if (fsi.isDirectory()) {
        stack.push(path);
      } else {
        yield path;
      }
    }
  }
}

export const db = (async () => {
  const index = from(files(join(process.cwd(), "content"))).pipe(
    share(),
  );
  const markdown = await lastValueFrom(index.pipe(
    filter(path => /\.md$/.test(path)),
    mergeMap(path => readFile(path, { encoding: "utf-8"})),
    mergeMap(parse),
    toArray(),
  ));
  return { markdown };
})();

