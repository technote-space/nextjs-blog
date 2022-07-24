import type { GetStaticPropsResult } from 'next';

export interface IRobotsPageProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  getStaticProps(): Promise<GetStaticPropsResult<{}>>;
}
