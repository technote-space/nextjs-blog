import type { StyleProps } from '@/components/wrap';
import type { FC } from 'react';
import { colors } from '@/components/constants';
import factory from '@/components/factory';

type Props = StyleProps;

const defaultProps: Props = {
  fontSize: '1.5em',
  lineHeight: '1.2em',
  color: colors.text,
};

const MainHeading: FC<Props> = ({ children, ...props }) => {
  return <factory.h2
    {...defaultProps}
    {...props}
  >
    {children}
  </factory.h2>;
};

MainHeading.displayName = 'MainHeading';
export default MainHeading;
