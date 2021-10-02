import type { LinkProps } from 'next/link';
import type { FC } from 'react';
import NextLink from 'next/link';

const Link: FC<LinkProps> = ({ children, ...props }) => {
  return <NextLink {...props}>
    <a>
      {children}
    </a>
  </NextLink>;
};

Link.displayName = 'Link';
export default Link;
