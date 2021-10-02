import type { Props } from '$/infra/app/layout/components/Layout';
import type { FC } from 'react';
import Layout from '$/infra/app/layout/components/Layout';

const View: FC<Props> = ({ children, ...props }) => {
  return <Layout
    {...props}
  >
    {children}
  </Layout>;
};

View.displayName = 'LayoutView';
export default View;
