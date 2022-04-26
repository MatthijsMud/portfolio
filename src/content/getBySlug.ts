import { db } from "./database";

export const getBySlug = async (slug: string) => {
  const matches = (await db).markdown.filter(md => {
    return md.metadata["slug"] === slug;
  });
  if (matches.length > 0) {
    return matches[0];
  }
}