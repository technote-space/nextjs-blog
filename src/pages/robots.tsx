import type { IRobotsPageProps } from '$/domain/pages/robots';
import type { GetStaticProps } from 'next';
import DefaultErrorPage from 'next/error';
import Head from 'next/head';
import { container } from 'tsyringe';

export default function RobotsPage() {
  return <>
    <Head>
      <meta name="robots" content="noindex"/>
      <title>robots</title>
    </Head>
    <DefaultErrorPage statusCode={404}/>
  </>;
}

export const getStaticProps: GetStaticProps = async () => container.resolve<IRobotsPageProps>('IRobotsPageProps').getStaticProps();
