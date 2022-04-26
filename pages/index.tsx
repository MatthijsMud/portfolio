import type { NextPage, GetStaticProps } from 'next';
import Head from "next/head";
import { getBySlug } from "$/content";

const Home: NextPage<Home.Props> = (props) => {
  const { 
    title = "",
    description = " ",
    tags = [],
  } = props;

  return <>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
    Homepage
  </>
}
declare namespace Home {
  export type Props = {
    title?: string;
    description?: string;
    tags?: string[]; 
  }
}

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const file = await getBySlug("/");
  const frontmatter = file?.metadata;
  return {
    props: {
      ...frontmatter as any
    }
  }
}

