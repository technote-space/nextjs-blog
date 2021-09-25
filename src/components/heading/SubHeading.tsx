import type { StyleProps } from '@/components/wrap';
import type { FC } from 'react';
import { colors } from '@/components/constants';
import factory from '@/components/factory';

type Props = StyleProps;

const defaultProps: Props = {
  fontSize: ['0.8em', '0.8em', '1em', '1em'],
  lineHeight: '1.35em',
  color: colors.subText,
  wordBreak: 'break-word',
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
