import type { IIndexPage } from '$/domain/pages';
import { getSortedPostsData } from '@/lib/posts';
import { container } from 'tsyringe';

const Home = (container.resolve('IIndexPage') as IIndexPage).create();
export default Home;

export async function getStaticProps() {
  const posts = getSortedPostsData();
  return {
    props: {
      posts,
    },
  };
}
