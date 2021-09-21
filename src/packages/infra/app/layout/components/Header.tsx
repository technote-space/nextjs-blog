import type { StyleProps } from '@/components/wrap';
import type { VFC } from 'react';
import { memo } from 'react';
import { wrap } from '@/components/wrap';
import Flex from '@/components/layout/Flex';
import Link from 'next/link';
import { pagesPath } from '@/lib/$path';

type Props = StyleProps & {
  title: string;
}

const defaultProps: StyleProps = {
  justifyContent: 'center',
  p: 8,
  mb: 5,
  letterSpacing: 8,
  fontSize: '2.2em',
  boxShadow: '0 0 5px #ccc',
};

const Header: VFC<Props> = ({ title, ...props }) => {
  return <wrap.header backgroundColor="white">
    <Flex {...defaultProps} {...props}>
      <Link href={pagesPath.$url()}>
        <a>{title}</a>
      </Link>
    </Flex>
  </wrap.header>;
};

Header.displayName = 'Header';
export default memo(Header);
