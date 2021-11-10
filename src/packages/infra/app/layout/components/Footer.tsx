import type { StyleProps } from '@/components';
import type { VFC } from 'react';
import { memo } from 'react';
import { Footer as FooterComponent } from '@/components';
import Flex from '@/components/layout/Flex';
import List from '@/components/layout/List';
import ListItem from '@/components/layout/ListItem';
import Link from '@/components/link/Link';
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

const Footer: VFC<Props> = ({ author, authorStyle, pages, pagesStyle, ...props }) => <FooterComponent>
  <Flex {...defaultProps} {...props}>
    {!!pages?.length && <Flex {...defaultPagesStyle} {...pagesStyle}>
      <List display="flex" flexWrap="wrap" justifyContent="center">
        {pages.map(({ label, url }, index) => <ListItem key={index} m={1} mx={2}>
          <Link href={url}>{label}</Link>
        </ListItem>)}
      </List>
    </Flex>}
    <Flex {...defaultAuthorStyle} {...authorStyle}>
      <Link href={pagesPath.$url()}>
        ©{(new Date()).getFullYear()} {author}
      </Link>
    </Flex>
  </Flex>
</FooterComponent>;

Footer.displayName = 'Footer';
export default memo(Footer);
