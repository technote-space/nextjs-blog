import type { IconButtonProps } from '@/components/wrap';
import type { VFC } from 'react';
import { memo } from 'react';
import { IconButton as IconButtonComponent } from '@/components/wrap';

type Props = IconButtonProps;

const defaultProps: Props = {
  'aria-label': 'アイコンボタン',
};

const IconButton: VFC<Props> = (props) => {
  return <IconButtonComponent {...defaultProps} {...props} />;
};

IconButton.displayName = 'IconButton';
export default memo(IconButton);
