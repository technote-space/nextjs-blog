import type { StyleProps } from '@/components/wrap';
import type { VFC } from 'react';
import Link from 'next/link';
import { memo } from 'react';
import Flex from '@/components/layout/Flex';
import { wrap } from '@/components/wrap';
import { pagesPath } from '@/lib/$path';

type Props = StyleProps & {
  author: string;
}

const defaultProps: StyleProps = {
  justifyContent: 'center',
  p: [5, 7, 8, 8],
  mt: 5,
  boxShadow: '0 0 5px #ccc',
};

const Footer: VFC<Props> = ({ author, ...props }) => <wrap.footer backgroundColor="white">
  <Flex {...defaultProps} {...props}>
    <Link href={pagesPath.$url()}>
      <a>©{(new Date()).getFullYear()} {author}</a>
    </Link>
  </Flex>
</wrap.footer>;

Footer.displayName = 'Footer';
export default memo(Footer);
