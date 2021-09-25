import type { IAnyPageProps, Props, Params } from '$/domain/pages/any';
import type { IPostPage } from '$/domain/pages/post';
import type { GetStaticProps, GetStaticPaths } from 'next';
import { container } from 'tsyringe';

export default (container.resolve('IPostPage') as IPostPage).create();

export const getStaticPaths: GetStaticPaths<Params> = async () => (container.resolve('IAnyPageProps') as IAnyPageProps).getStaticPaths();

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => (container.resolve('IAnyPageProps') as IAnyPageProps).getStaticProps(params);
