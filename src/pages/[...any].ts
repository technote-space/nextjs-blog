import type { IAnyPageProps, Props, Params } from '$/domain/pages/any';
import type { IPostPage } from '$/domain/pages/post';
import type { GetStaticProps, GetStaticPaths } from 'next';
import { container } from 'tsyringe';

export default container.resolve<IPostPage>('IPostPage').create();

export const getStaticPaths: GetStaticPaths<Params> = async () => container.resolve<IAnyPageProps>('IAnyPageProps').getStaticPaths();

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => container.resolve<IAnyPageProps>('IAnyPageProps').getStaticProps(params);
