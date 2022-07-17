import type { Props } from '$/infra/app/layout/components/Layout';
import type { FC, PropsWithChildren } from 'react';
import Layout from '$/infra/app/layout/components/Layout';

const View: FC<PropsWithChildren<Props>> = ({ children, ...props }) => {
  return <Layout
    {...props}
  >
    {children}
  </Layout>;
};

View.displayName = 'LayoutView';
export default View;
