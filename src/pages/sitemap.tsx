import type { ISitemapPageProps } from '@/domain/pages/sitemap';
import type { GetStaticProps } from 'next';
import DefaultErrorPage from 'next/error';
import Head from 'next/head';
import { container } from 'tsyringe';

export default function SitemapPage() {
  return <>
    <Head>
      <meta name="sitemap" content="noindex"/>
      <title>sitemap</title>
    </Head>
    <DefaultErrorPage statusCode={404}/>
  </>;
}

export const getStaticProps: GetStaticProps = async () => container.resolve<ISitemapPageProps>('ISitemapPageProps').getStaticProps();
