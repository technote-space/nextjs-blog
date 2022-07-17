import 'reflect-metadata';
import '@testing-library/jest-dom/extend-expect';
import type { FC, PropsWithChildren } from 'react';

const SimpleReactLightbox: FC<PropsWithChildren> = ({ children }) => <>{children}</>;
const SRLWrapper: FC<PropsWithChildren> = ({ children }) => <>{children}</>;

jest.mock('simple-react-lightbox', () => ({
  __esModule: true,
  default: SimpleReactLightbox,
  SRLWrapper,
}));
