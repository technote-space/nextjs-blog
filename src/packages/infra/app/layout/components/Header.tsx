import type { StyleProps } from '@/components';
import type { FC } from 'react';
import type { IconType } from 'react-icons';
import { memo } from 'react';
import { Header as HeaderComponent } from '@/components';
import IconButton from '@/components/button/IconButton';
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
  title: string;
  titleStyle?: StyleProps;
  pages?: PostData[];
  pagesStyle?: StyleProps;
  toggleColorMode?: () => void;
  ToggleIcon?: IconType;
}

const defaultProps: StyleProps & Pick<Props, 'titleStyle' | 'pagesStyle'> = {
  display: 'flex',
  flexDirection: ['column', 'column', 'row', 'row'],
  px: [3, 5, 8, 8],
  py: [5, 6, 8, 8],
  mb: 5,
  boxShadow: '0 0 5px #ccc',
};
const defaultTitleStyle: StyleProps = {
  justifyContent: 'center',
  alignItems: 'center',
  letterSpacing: 8,
  fontSize: '2.2em',
  flexGrow: 1,
  lineHeight: '1.2em',
};
const defaultPagesStyle: StyleProps = {
  justifyContent: 'right',
  flexShrink: 0,
  mt: [3, 3, 0, 0],
  maxWidth: ['none', 'none', '25%', '25%'],
};

const Header: FC<Props> = ({ title, titleStyle, pages, pagesStyle, toggleColorMode, ToggleIcon, ...props }) => {
  const createPagesComponent = (hide?: boolean) => pages?.length ?
    <Flex {...defaultPagesStyle} {...pagesStyle} {...(hide ? { visibility: 'hidden', maxHeight: '1.5em' } : {})}>
      <List display={['flex', 'flex', 'block', 'block']} flexWrap="wrap">
        {pages.map(({ label, url }, index) => <ListItem key={index} ml={[5, 5, 0, 0]}>
          <Link href={url}>{label}</Link>
        </ListItem>)}
      </List>
    </Flex> : null;
  return <HeaderComponent>
    <Flex {...defaultProps} {...props}>
      {createPagesComponent(true)}
      <Flex {...defaultTitleStyle} {...titleStyle}>
        <Link href={pagesPath.$url()}>
          {title}
        </Link>
      </Flex>
      {createPagesComponent()}
      {toggleColorMode && ToggleIcon && <IconButton
        size="md"
        fontSize="lg"
        aria-label="Switch dark mode"
        variant="ghost"
        color="current"
        onClick={toggleColorMode}
        icon={<ToggleIcon/>}
        minW={'auto'}
      />}
    </Flex>
  </HeaderComponent>;
};

Header.displayName = 'Header';
export default memo(Header);
