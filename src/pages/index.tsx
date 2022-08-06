import type { IIndexPage, IIndexPageProps, Props } from '@/domain/pages';
import type { GetStaticProps } from 'next';
import { container } from 'tsyringe';

export default container.resolve<IIndexPage>('IIndexPage').create();

export const getStaticProps: GetStaticProps<Props> = async () => container.resolve<IIndexPageProps>('IIndexPageProps').getStaticProps(undefined);
