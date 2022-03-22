import type { NextPage, GetStaticProps } from 'next';
import Head from "next/head";
import { getBySlug, extractFrontmatter } from "$/content";

const Home: NextPage = (props: any) => { // TODO: Improve type
  const { title = "" } = props;
  return <>
    <Head>
      <title>{title}</title>
    </Head>
    Homepage
  </>
}

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const file = await getBySlug("Home.md");
  const frontmatter = await extractFrontmatter(file);
  return {
    props: {
      ...frontmatter as any
    }
  }
}

