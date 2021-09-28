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
  title: string;
  titleStyle?: StyleProps;
  pages?: PostData[];
  pagesStyle?: StyleProps;
}

const defaultProps: StyleProps & Pick<Props, 'titleStyle' | 'pagesStyle'> = {
  display: 'flex',
  flexDirection: ['column', 'column', 'row', 'row'],
  p: [5, 7, 8, 8],
  mb: 5,
  boxShadow: '0 0 5px #ccc',
};
const defaultTitleStyle: StyleProps = {
  justifyContent: 'center',
  letterSpacing: 8,
  fontSize: '2.2em',
  flexGrow: 1,
};

const defaultPagesStyle: StyleProps = {
  justifyContent: 'right',
  flexShrink: 0,
  mt: [3, 3, 0, 0],
};

const Header: VFC<Props> = ({ title, titleStyle, pages, pagesStyle, ...props }) => {
  const createPagesComponent = (hide?: boolean) => pages?.length ?
    <Flex {...defaultPagesStyle} {...pagesStyle} {...(hide ? { visibility: 'hidden' } : {})}>
      <List display={['flex', 'flex', 'block', 'block']}>
        {pages.map(({ label, url }) => <List.Item key={url} ml={[5, 5, 0, 0]}>
          <Link href={url}>{label}</Link>
        </List.Item>)}
      </List>
    </Flex> : null;
  return <wrap.header backgroundColor="white">
    <Flex {...defaultProps} {...props}>
      {createPagesComponent(true)}
      <Flex {...defaultTitleStyle} {...titleStyle}>
        <Link href={pagesPath.$url()}>
          {title}
        </Link>
      </Flex>
      {createPagesComponent()}
    </Flex>
  </wrap.header>;
};

Header.displayName = 'Header';
export default memo(Header);
