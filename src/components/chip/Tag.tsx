import type { StyleProps } from '@/components/wrap';
import type { FC } from 'react';
import { memo } from 'react';
import { FaTag } from 'react-icons/fa';
import Link from '@/components/link/Link';
import { Icon, WrapItem, HStack, Text } from '@/components/wrap';
import { pagesPath } from '@/lib/$path';

type Props = StyleProps & {
  slug?: string;
  name: string;
  iconColor?: string;
};

const defaultProps: StyleProps = {
  px: '12px',
  m: '3px',
  display: 'inline-flex',
  alignItems: 'center',
  minH: '32px',
  borderWidth: 1,
  borderRadius: 'md',
  _hover: {
    boxShadow: 'sm',
    transform: 'translateY(-1px)',
  },
};

const TagChip: FC<Props> = ({ slug, name, iconColor, ...props }) => {
  if (!slug) {
    return <WrapItem
      {...defaultProps}
      border="none"
      _hover={undefined}
      {...props}
    >
      <HStack>
        <Icon as={FaTag} color={iconColor}/>
        <Text>{name}</Text>
      </HStack>
    </WrapItem>;
  }

  return <Link
    href={pagesPath.tags._tag(slug).$url()}
  >
    <WrapItem
      {...defaultProps}
      {...props}
    >
      <HStack>
        <Icon as={FaTag} color={iconColor}/>
        <Text>{name}</Text>
      </HStack>
    </WrapItem>
  </Link>;
};

TagChip.displayName = 'TagChip';
export default memo(TagChip);
