import type { IAnyPageProps, Props, Params } from '$/domain/pages/any';
import type { GetStaticProps, GetStaticPaths } from 'next';
import { container } from 'tsyringe';

export default function AnyPage(): null {
  return null;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => container.resolve<IAnyPageProps>('IAnyPageProps').getStaticPaths();

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => container.resolve<IAnyPageProps>('IAnyPageProps').getStaticProps(params);
