import 'reflect-metadata';
import '@testing-library/jest-dom/extend-expect';
import type { FC } from 'react';

const SimpleReactLightbox: FC = ({ children }) => <>{children}</>;
const SRLWrapper: FC = ({ children }) => <>{children}</>;

jest.mock('simple-react-lightbox', () => ({
  __esModule: true,
  default: SimpleReactLightbox,
  SRLWrapper,
}));
