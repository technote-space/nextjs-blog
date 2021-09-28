import type { StyleProps } from '@/components/wrap';
import type { VFC } from 'react';
import { memo } from 'react';
import Flex from '@/components/layout/Flex';
import List from '@/components/layout/List';
import Link from '@/components/link/Link';
import { wrap } from '@/components/wrap';
import { pagesPath } from '@/lib/$path';

type PostData = {
  label: string;
  url: string;
};

type Props = StyleProps & {
  author: string;
  authorStyle?: StyleProps;
  pages?: PostData[];
  pagesStyle?: StyleProps;
}

const defaultProps: StyleProps = {
  flexDirection: 'column',
  justifyContent: 'center',
  p: [5, 7, 8, 8],
  mt: 5,
  boxShadow: '0 0 5px #ccc',
};
const defaultAuthorStyle: StyleProps = {
  justifyContent: 'center',
};
const defaultPagesStyle: StyleProps = {
  justifyContent: 'center',
  mb: 2,
};

const Footer: VFC<Props> = ({ author, authorStyle, pages, pagesStyle, ...props }) => <wrap.footer
  backgroundColor="white"
>
  <Flex {...defaultProps} {...props}>
    {!!pages?.length && <Flex {...defaultPagesStyle} {...pagesStyle}>
      <List display="flex" flexWrap="wrap">
        {pages.map(({ label, url }) => <List.Item key={url} m={1} mx={2}>
          <Link href={url}>{label}</Link>
        </List.Item>)}
      </List>
    </Flex>}
    <Flex {...defaultAuthorStyle} {...authorStyle}>
      <Link href={pagesPath.$url()}>
        ©{(new Date()).getFullYear()} {author}
      </Link>
    </Flex>
  </Flex>
</wrap.footer>;

Footer.displayName = 'Footer';
export default memo(Footer);
