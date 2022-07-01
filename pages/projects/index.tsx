import { NextPage, GetStaticProps } from "next";
import Link from "next/link";
import Head from "next/head";
import styled from "@emotion/styled";
import { getAllSlugs, getBySlug } from "$/content";
import { TilePage } from "$/templates";

const CardMedia = styled("div")<{aspect: number}>(({ aspect }) => {
  return {
    backgroundColor: "#fff1",
    margin: "-1rem",
    marginBottom: "1rem",
    "&::before": {
      display: "block",
      content: JSON.stringify(""),
      paddingTop: `${(1/aspect)*100}%`,
    }
  }
})

const ProjectsPage: NextPage<ProjectsPage.Props> = (props) => {
  return <>
    <Head>
      <title>Projects</title>
      <meta name="description" content="Overview of projects that have been worked on." />
    </Head>
    <TilePage tiles={props.metadata.map(page => ({ 
      banner: page.banner.src || "banners/Default.svg",
      href: page.slug, 
      title: page.title ,
      description: page.description,
    }))} />
  </>
}
declare namespace ProjectsPage {
  export type Props = {
    //slugs: string[];
    metadata: readonly {
      title: string;
      slug: string;
      banner: { src: string, description: string };
      description: string;
    }[]
  }
}

export default ProjectsPage;

export const getStaticProps: GetStaticProps<ProjectsPage.Props> = async () => {
  const slugs = (await getAllSlugs()).filter(slug => /^\/projects\//.test(slug));
  const pages = await Promise.all(slugs.map(getBySlug));
  
  return {
    props: {
      metadata: pages.map(page => page?.metadata).sort((a, b) => a.title.localeCompare(b.title)),
    }
  }
}