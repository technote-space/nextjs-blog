import type { FlexProps } from '@chakra-ui/react';
import type { VFC } from 'react';
import { Flex as ChakraUiFlex } from '@chakra-ui/react';
import { memo } from 'react';

type Props = FlexProps;

const defaultProps: Props = {};

const Flex: VFC<Props> = (props) => {
  return <ChakraUiFlex {...defaultProps} {...props} />;
};

Flex.displayName = 'Flex';
export default memo(Flex);
