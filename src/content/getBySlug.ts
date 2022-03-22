import { readdir, readFile } from "fs/promises";
import { join, sep, } from "path";

const normalizePath = (path: string): string => {
  // The web uses forward slashes, but not all operating systems agree.
  // Last value tends to be a file, but… eh.
  const folders = path.split("/");
  folders.forEach(relative => {
  // Paths ought to be specified relative to the root of the project.
  // Any files outside of this root should not be read; this means
  // that there is no reason to go "up" a folder.
    if (relative === "..") {
      throw new Error("Slug includes reference to parent folder.");
    }
  });
  return join.apply(undefined, ["content", ...folders]);
}

export const getBySlug = async (slug: string) => {
  const path = join(process.cwd(), normalizePath(slug));

  const fileContents = await readFile(path, "utf-8");
  return fileContents;
}