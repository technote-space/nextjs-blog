import type { BoxProps } from '@chakra-ui/react';
import type { VFC } from 'react';
import { Box as ChakraUiBox } from '@chakra-ui/react';

type Props = BoxProps;

const defaultProps: Props = {};

const Box: VFC<Props> = (props) => {
  return <ChakraUiBox {...defaultProps} {...props} />;
};

Box.displayName = 'Box';
export default Box;
