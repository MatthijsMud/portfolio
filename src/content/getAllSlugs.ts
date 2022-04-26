import { db } from "./database";

export const getAllSlugs = async () => {
  return (await db).markdown.map(md => md.metadata.slug).filter(slug => typeof slug === "string");
}