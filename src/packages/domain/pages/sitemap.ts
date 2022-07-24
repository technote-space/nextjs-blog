import type { GetStaticPropsResult } from 'next';

export interface ISitemapPageProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  getStaticProps(): Promise<GetStaticPropsResult<{}>>;
}
