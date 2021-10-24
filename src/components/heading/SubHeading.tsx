import type { StyleProps } from '@/components/wrap';
import type { FC } from 'react';
import { Heading3 } from '@/components/wrap';

type Props = StyleProps;

const defaultProps: Props = {
  fontSize: ['0.8em', '0.8em', '1em', '1em'],
  lineHeight: '1.35em',
  wordBreak: 'break-word',
};

const SubHeading: FC<Props> = ({ children, ...props }) => {
  return <Heading3
    {...defaultProps}
    {...props}
  >
    {children}
  </Heading3>;
};

SubHeading.displayName = 'SubHeading';
export default SubHeading;
