import type { IPostPage } from '$/domain/pages/post';
import { getAllPostIds, getPostData } from '@/lib/posts';
import { container } from 'tsyringe';

type Params = {
  id: string;
}

const Post = (container.resolve('IPostPage') as IPostPage).create();
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
