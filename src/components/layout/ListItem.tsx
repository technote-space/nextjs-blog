import type { ListItemProps } from '@chakra-ui/react';
import type { FC } from 'react';
import { ListItem as ChakraUiListItem } from '@chakra-ui/react';

type Props = ListItemProps;

const defaultProps: Props = {};

const ListItem: FC<Props> = ({ children, ...props }) => {
  return <ChakraUiListItem {...defaultProps} {...props} >
    {children}
  </ChakraUiListItem>;
};

ListItem.displayName = 'ListItem';
export default ListItem;
