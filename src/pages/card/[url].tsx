import type { ICardPage, ICardPageProps, Props, Params } from '$/domain/pages/card';
import type { GetStaticProps, GetStaticPaths } from 'next';
import { container } from 'tsyringe';

export default (container.resolve('ICardPage') as ICardPage).create();

export const getStaticPaths: GetStaticPaths<Params> = async () => (container.resolve('ICardPageProps') as ICardPageProps).getStaticPaths();

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => (container.resolve('ICardPageProps') as ICardPageProps).getStaticProps(params);
