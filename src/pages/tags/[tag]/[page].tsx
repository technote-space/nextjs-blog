import type { ITagPage } from '$/domain/pages/tag';
import type { ITagPagedPageProps, Props, Params } from '$/domain/pages/tag/paged';
import type { GetStaticProps, GetStaticPaths } from 'next';
import { container } from 'tsyringe';

export default container.resolve<ITagPage>('ITagPage').create();

export const getStaticPaths: GetStaticPaths<Params> = async () => container.resolve<ITagPagedPageProps>('ITagPagedPageProps').getStaticPaths(undefined);

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => container.resolve<ITagPagedPageProps>('ITagPagedPageProps').getStaticProps(undefined, params);
