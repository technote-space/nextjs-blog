import type { StyleProps } from '@/components/wrap';
import type { VFC } from 'react';
import { memo } from 'react';
import Flex from '@/components/layout/Flex';
import Link from '@/components/link/Link';
import { wrap } from '@/components/wrap';
import { pagesPath } from '@/lib/$path';

type Props = StyleProps & {
  title: string;
}

const defaultProps: StyleProps = {
  justifyContent: 'center',
  p: [5, 7, 8, 8],
  mb: 5,
  letterSpacing: 8,
  fontSize: '2.2em',
  boxShadow: '0 0 5px #ccc',
};

const Header: VFC<Props> = ({ title, ...props }) => <wrap.header backgroundColor="white">
  <Flex {...defaultProps} {...props}>
    <Link href={pagesPath.$url()}>
      {title}
    </Link>
  </Flex>
</wrap.header>;

Header.displayName = 'Header';
export default memo(Header);
