import type { IIndexPage } from '$/domain/pages';
import type { IPagedPageProps, Props, Params } from '$/domain/pages/paged';
import type { GetStaticProps, GetStaticPaths } from 'next';
import { container } from 'tsyringe';

export default container.resolve<IIndexPage>('IIndexPage').create();

export const getStaticPaths: GetStaticPaths<Params> = async () => container.resolve<IPagedPageProps>('IPagedPageProps').getStaticPaths(undefined);

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => container.resolve<IPagedPageProps>('IPagedPageProps').getStaticProps(undefined, params);
