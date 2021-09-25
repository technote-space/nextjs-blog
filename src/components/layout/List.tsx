import type { ListProps, ListItemProps } from '@chakra-ui/react';
import type { FC } from 'react';
import { List as ChakraUiList, ListItem } from '@chakra-ui/react';

type Props = ListProps;

const defaultProps: Props = {};

const List: FC<Props> & { Item: FC<ListItemProps>; } = ({ children, ...props }) => {
  return <ChakraUiList {...defaultProps} {...props} >
    {children}
  </ChakraUiList>;
};
List.Item = ListItem;

List.displayName = 'List';
export default List;
