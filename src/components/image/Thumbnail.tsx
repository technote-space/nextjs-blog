import type { ImageProps } from '@chakra-ui/react';
import type { VFC } from 'react';
import { Image } from '@chakra-ui/react';
import { memo } from 'react';

type Props = ImageProps;

const defaultProps: Props = {
  alt: 'thumbnail',
  objectFit: 'cover',
  width: 150,
  height: 150,
  loading: 'lazy',
  flexShrink: 0,
};

const processProps = (props: Props) => {
  return {
    ...props,
    htmlWidth: props.htmlWidth ?? (typeof props.width === 'number' ? props.width : Array.isArray(props.width) ? (props.width[0] as number) : undefined),
    htmlHeight: props.htmlHeight ?? (typeof props.height === 'number' ? props.height : Array.isArray(props.height) ? (props.height[0] as number) : undefined),
    width: props.width ?? props.htmlWidth,
    height: props.height ?? props.htmlHeight,
  };
};

const Thumbnail: VFC<Props> = (props) => {
  if (!props.src) {
    return null;
  }

  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...processProps({ ...defaultProps, ...props })} />;
};

Thumbnail.displayName = 'Thumbnail';
export default memo(Thumbnail);
