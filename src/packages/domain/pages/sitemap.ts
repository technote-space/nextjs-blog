import type { GetServerSidePropsResult, GetServerSidePropsContext } from 'next';

export interface ISitemapPageProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<{}>>;
}
