import type { VFC } from 'react';
import Head from 'next/head';
import Layout, { siteTitle } from '@/components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData, Post } from '@/lib/posts';
import Link from 'next/link';
import Date from '@/components/date';
import { pagesPath } from '@/lib/$path'

type Props = {
  allPostsData: Post[];
}

const Home: VFC<Props> = ({ allPostsData }) => {
  return (
    <Layout isHome>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this in{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={pagesPath.posts._id(id).$url()}>
                <a>{title}</a>
              </Link>
              <br/>
              <small className={utilStyles.lightText}>
                <Date date={date}/>
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

Home.displayName = 'Home';
export default Home;

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
