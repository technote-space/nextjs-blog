import type { ListItemProps } from '@/components/wrap';
import type { FC } from 'react';
import { ListItem as ListItemComponent } from '@/components/wrap';

type Props = ListItemProps;

const defaultProps: Props = {};

const ListItem: FC<Props> = ({ children, ...props }) => {
  return <ListItemComponent {...defaultProps} {...props} >
    {children}
  </ListItemComponent>;
};

ListItem.displayName = 'ListItem';
export default ListItem;
