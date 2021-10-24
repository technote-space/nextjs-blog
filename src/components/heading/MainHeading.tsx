import type { StyleProps } from '@/components/wrap';
import type { FC } from 'react';
import { Heading2 } from '@/components/wrap';

type Props = StyleProps;

const defaultProps: Props = {
  fontSize: ['1em', '1em', '1.35em', '1.35em'],
  lineHeight: ['1.3em', '1.3em', '1.5em', '1.5em'],
  wordBreak: 'break-word',
};

const MainHeading: FC<Props> = ({ children, ...props }) => {
  return <Heading2
    {...defaultProps}
    {...props}
  >
    {children}
  </Heading2>;
};

MainHeading.displayName = 'MainHeading';
export default MainHeading;
