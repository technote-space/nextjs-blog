import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

export type Params = {
  url: string;
};

export interface ICardPageProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  getServerSideProps(context: GetServerSidePropsContext<Params>): Promise<GetServerSidePropsResult<{}>>;
}
