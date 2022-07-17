import type { BoxProps } from '@/components/wrap';
import type { FC } from 'react';
import { memo } from 'react';
import { Box as BoxComponent } from '@/components/wrap';

type Props = BoxProps;

const defaultProps: Props = {};

const Box: FC<Props> = (props) => {
  return <BoxComponent {...defaultProps} {...props} />;
};

Box.displayName = 'Box';
export default memo(Box);
