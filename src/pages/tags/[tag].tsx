import type { ITagPage, ITagPageProps, Props, Params } from '$/domain/pages/tag';
import type { GetStaticProps, GetStaticPaths } from 'next';
import { container } from 'tsyringe';

export default (container.resolve('ITagPage') as ITagPage).create();

export const getStaticPaths: GetStaticPaths<Params> = async () => (container.resolve('ITagPageProps') as ITagPageProps).getStaticPaths();

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => (container.resolve('ITagPageProps') as ITagPageProps).getStaticProps(params);
