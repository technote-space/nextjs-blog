import type { ISitemapPageProps } from '$/domain/pages/sitemap';
import type { GetServerSideProps } from 'next';
import { container } from 'tsyringe';

export default function SitemapXmlPage(): null {
  return null;
}

export const getServerSideProps: GetServerSideProps = async (context) => (container.resolve('ISitemapPageProps') as ISitemapPageProps).getServerSideProps(context);
