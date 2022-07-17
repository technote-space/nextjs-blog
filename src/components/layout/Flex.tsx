import type { FlexProps } from '@/components/wrap';
import type { FC } from 'react';
import { memo } from 'react';
import { Flex as FlexComponent } from '@/components/wrap';

type Props = FlexProps;

const defaultProps: Props = {};

const Flex: FC<Props> = (props) => {
  return <FlexComponent {...defaultProps} {...props} />;
};

Flex.displayName = 'Flex';
export default memo(Flex);
