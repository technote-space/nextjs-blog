import type { GetStaticProps, GetStaticPaths } from 'next';
import type { IPostPage, IPostPageProps, Props, Params } from '$/domain/pages/post';
import { container } from 'tsyringe';

export default (container.resolve('IPostPage') as IPostPage).create();

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  return (container.resolve('IPostPageProps') as IPostPageProps).getStaticPaths();
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  return {
    props: await (container.resolve('IPostPageProps') as IPostPageProps).getStaticProps(params),
  };
};
