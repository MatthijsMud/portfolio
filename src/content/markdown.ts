import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import { visit, SKIP, } from "unist-util-visit";
import { remove } from "unist-util-remove";
import { removePosition } from "unist-util-remove-position";
import { parse as yaml } from "yaml";

export const parse = async (content: string) => {
  let ast = unified()
  .use(remarkParse)
  .use(remarkFrontmatter)
  .parse(content);

  // Reduce the amount of data that needs to be sent
  // by removing the "position" which has little relevance.
  ast = removePosition(ast, true);

  // Some props in the frontmatter are solely required for the back-end.
  // Given this means the data is parsed once already, a curated list
  // can be sent to the client instead. This way the client receives 
  // only the required data, and does not need a parser for frontmatter.
  let metadata: any;
  visit(ast, "yaml", (node) => {
    metadata = yaml(node.value);
    // Skip children of "yaml", as they should not exist in the first place.
    return SKIP; // Consideration: `EXIT`; only one frontmatter should exist.
  });
  ast = remove(ast, "yaml") || { type: "root", children: [] };

  return {
    ast,
    metadata,
  }
}