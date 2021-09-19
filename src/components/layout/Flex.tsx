import type { FlexProps } from '@chakra-ui/react';
import type { VFC } from 'react';
import { Flex as ChakraUiFlex } from '@chakra-ui/react';

type Props = FlexProps;

const defaultProps: Props = {};

const Flex: VFC<Props> = (props) => {
  return <ChakraUiFlex {...defaultProps} {...props} />;
};

Flex.displayName = 'Flex';
export default Flex;
