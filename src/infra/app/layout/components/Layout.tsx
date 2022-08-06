import type { FC, PropsWithChildren, ReactNode } from 'react';
import Box from '@/components/layout/Box';

export type Props = {
  head: ReactNode;
  header: ReactNode;
  footer: ReactNode;
};

const Layout: FC<PropsWithChildren<Props>> = ({ head, header, footer, children }) => {
  return <Box>
    {head}
    {header}
    <main>
      <Box mx="auto" maxW={900}>
        {children}
      </Box>
    </main>
    {footer}
  </Box>;
};

Layout.displayName = 'Layout';
export default Layout;
