import type { VFC } from 'react';
import Layout from '../../components/layout';
import { getAllPostIds, getPostData, Post as PostType } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

type Props = {
  post: PostType;
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

Post.displayName = 'Post';
export default Post;

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: Params }) {
  return {
    props: {
      post: await getPostData(params.id),
    },
  };
}
