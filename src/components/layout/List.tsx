import type { ListProps } from '@chakra-ui/react';
import type { FC } from 'react';
import { List as ChakraUiList } from '@chakra-ui/react';

type Props = ListProps;

const defaultProps: Props = {};

const List: FC<Props> = ({ children, ...props }) => {
  return <ChakraUiList {...defaultProps} {...props} >
    {children}
  </ChakraUiList>;
};

List.displayName = 'List';
export default List;
