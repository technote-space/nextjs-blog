import type { ListProps } from '@/components/wrap';
import type { FC } from 'react';
import { List as ListComponent } from '@/components/wrap';

type Props = ListProps;

const defaultProps: Props = {};

const List: FC<Props> = ({ children, ...props }) => {
  return <ListComponent {...defaultProps} {...props} >
    {children}
  </ListComponent>;
};

List.displayName = 'List';
export default List;
