import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { unified } from "unified";
import remark2Rehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import type { Root as HtmlAst } from "hast";
import { Image } from "$/components/image";
import { Paper } from "$/components/paper";

import { Link } from "$/components/link";
import { Markdown, MarkdownComponents } from "$/components/markdown";
import Head from "next/head";
import { getBySlug, getAllSlugs } from "$/content";

import styled from "@emotion/styled";

const Body = styled(Paper)({
  margin: "0rem auto",
  maxWidth: "800px",
});

const ProjectPage: NextPage<ProjectPage.Props> = (props) => {
  return <>
    <Head>
      <title>{props.title}</title>
    </Head>
    <Body>
      <Image aspect={16 / 9} src="/banners/Default.svg" alt={props.banner?.description} />
      
      <main style={{ padding: "2rem" }}>
        <MarkdownComponents components={{ a: Link }}>
          <Markdown ast={props.ast} />
        </MarkdownComponents>
      </main>

    </Body>
  </>
}
declare namespace ProjectPage {
  export type Props = {
    ast: HtmlAst;
    tags?: string[];
    title?: string;
    banner?: {
      description?: string;
    };
  }
}

export default ProjectPage;

export const getStaticProps: GetStaticProps<ProjectPage.Props> = async ({ params }) => {
  const project = params?.["project"];
  if (typeof project !== "string") {
    
    return { notFound: true };
  }

  const file = await getBySlug(`/projects/${project}`);
  if (typeof file === "undefined") {
    return { notFound: true };
  }
  const { ast, metadata } = file;

  const hast = await unified()
  .use(remark2Rehype)
  .use(rehypeHighlight)
  .run(ast);

  return {
    props: {
      ...metadata,
    // Consideration: Let the client transform the syntax tree.
    // This does however mean that the transformers need to be shipped
    // as well; the saving in the syntax tree might not measure up to
    // this cost.
      ast: hast,
    },
  };
}

export const getStaticPaths: GetStaticPaths = async () => {

  const paths = (await getAllSlugs()).filter(slug => /^\/projects\//.test(slug));
  return {
    paths,
    fallback: false,
  };
}