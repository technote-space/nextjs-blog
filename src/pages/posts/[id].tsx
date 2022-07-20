import type { IPostPage, IPostPageProps, Props, Params } from '$/domain/pages/post';
import type { GetStaticProps, GetStaticPaths } from 'next';
import { container } from 'tsyringe';

export default container.resolve<IPostPage>('IPostPage').create();

export const getStaticPaths: GetStaticPaths<Params> = async () => container.resolve<IPostPageProps>('IPostPageProps').getStaticPaths(undefined);

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => container.resolve<IPostPageProps>('IPostPageProps').getStaticProps(undefined, params);
