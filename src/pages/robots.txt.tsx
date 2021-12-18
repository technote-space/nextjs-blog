import type { IRobotsPageProps } from '$/domain/pages/robots';
import type { GetServerSideProps } from 'next';
import { container } from 'tsyringe';

export default function RobotsTxtPage(): null {
  return null;
}

export const getServerSideProps: GetServerSideProps = async (context) => container.resolve<IRobotsPageProps>('IRobotsPageProps').getServerSideProps(context);
