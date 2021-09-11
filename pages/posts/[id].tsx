import Layout from '../../components/layout';
import { getAllPostIds, getPostData, Post } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import { VFC } from 'react';

type Props = {
  post: Post;
}
type Params = {
  id: string;
}

const Post: VFC<Props> = ({ post }) => {
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{post.title}</h1>
        <div className={utilStyles.lightText}>
          <Date date={post.date}/>
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }}/>
      </article>
    </Layout>
  );
};

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: Params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
