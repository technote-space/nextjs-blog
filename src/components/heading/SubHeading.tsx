import type { StyleProps } from '@/components/wrap';
import type { FC } from 'react';
import { colors } from '@/components/constants';
import factory from '@/components/factory';

type Props = StyleProps;

const defaultProps: Props = {
  color: colors.subText,
};

const SubHeading: FC<Props> = ({ children, ...props }) => {
  return <factory.h3
    {...defaultProps}
    {...props}
  >
    {children}
  </factory.h3>;
};

SubHeading.displayName = 'SubHeading';
export default SubHeading;
