import type { PostData } from '$/domain/app/settings';
import type { StyleProps } from '@/components/wrap';
import type { VFC } from 'react';
import { memo } from 'react';
import Flex from '@/components/layout/Flex';
import Link from '@/components/link/Link';
import { wrap } from '@/components/wrap';
import { pagesPath } from '@/lib/$path';

type Props = StyleProps & {
  author: string;
  pages?: PostData[];
}

const defaultProps: StyleProps = {
  justifyContent: 'center',
  p: [5, 7, 8, 8],
  mt: 5,
  boxShadow: '0 0 5px #ccc',
};

const Footer: VFC<Props> = ({ author, pages, ...props }) => <wrap.footer backgroundColor="white">
  <Flex {...defaultProps} {...props}>
    <Link href={pagesPath.$url()}>
      ©{(new Date()).getFullYear()} {author}
    </Link>
  </Flex>
</wrap.footer>;

Footer.displayName = 'Footer';
export default memo(Footer);
