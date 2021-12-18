import type { ITagPage, ITagPageProps, Props, Params } from '$/domain/pages/tag';
import type { GetStaticProps, GetStaticPaths } from 'next';
import { container } from 'tsyringe';

export default container.resolve<ITagPage>('ITagPage').create();

export const getStaticPaths: GetStaticPaths<Params> = async () => container.resolve<ITagPageProps>('ITagPageProps').getStaticPaths();

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => container.resolve<ITagPageProps>('ITagPageProps').getStaticProps(params);
