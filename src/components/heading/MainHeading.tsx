import type { StyleProps } from '@/components/wrap';
import type { FC } from 'react';
import { colors } from '@/components/constants';
import factory from '@/components/factory';

type Props = StyleProps;

const defaultProps: Props = {
  fontSize: ['1em', '1em', '1.35em', '1.35em'],
  lineHeight: ['1.3em', '1.3em', '1.5em', '1.5em'],
  color: colors.text,
  wordBreak: 'break-word',
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
