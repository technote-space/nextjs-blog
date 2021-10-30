import type { ICardPageProps, Params } from '$/domain/pages/card';
import type { GetServerSideProps } from 'next';
import { container } from 'tsyringe';

export default function CardPage(): null {
  return null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getServerSideProps: GetServerSideProps<{ [key: string]: any }, Params> = async (context) => (container.resolve('ICardPageProps') as ICardPageProps).getServerSideProps(context);
