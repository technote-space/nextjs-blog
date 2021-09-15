import type { GetStaticProps } from 'next';
import type { IIndexPage, IIndexPageProps, Props } from '$/domain/pages';
import { container } from 'tsyringe';

export default (container.resolve('IIndexPage') as IIndexPage).create();

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: await (container.resolve('IIndexPageProps') as IIndexPageProps).getStaticProps(),
});
