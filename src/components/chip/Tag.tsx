import type { StyleProps } from '@/components/wrap';
import type { VFC } from 'react';
import { memo } from 'react';
import { FaTag } from 'react-icons/fa';
import Link from '@/components/link/Link';
import { Icon, WrapItem, HStack, Text } from '@/components/wrap';
import { pagesPath } from '@/lib/$path';

type Props = StyleProps & {
  tag: string;
  iconColor?: string;
};

const defaultProps: StyleProps = {
  px: 12,
  display: 'flex',
  alignItems: 'center',
  minH: 32,
  borderWidth: 1,
  borderRadius: 'md',
  _hover: {
    boxShadow: 'sm',
    transform: 'translateY(-1px)',
  },
};

const TagChip: VFC<Props> = ({ tag, iconColor, ...props }) => {
  return <WrapItem>
    <Link
      {...defaultProps}
      {...props}
      href={pagesPath.tags._tag(tag).$url()}
    >
      <HStack>
        <Icon as={FaTag} color={iconColor}/>
        <Text>{tag}</Text>
      </HStack>
    </Link>
  </WrapItem>;
};

TagChip.displayName = 'TagChip';
export default memo(TagChip);
