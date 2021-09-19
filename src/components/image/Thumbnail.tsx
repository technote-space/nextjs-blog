import type { ImageProps } from '@chakra-ui/react';
import type { VFC } from 'react';
import { Image } from '@chakra-ui/react';

type Props = ImageProps;

const defaultProps: Props = {
  alt: 'thumbnail',
  objectFit: 'cover',
  htmlWidth: 150,
  htmlHeight: 150,
  loading: 'lazy',
  flexShrink: 0,
};

const processProps = (props: Props) => {
  return {
    ...props,
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
export default Thumbnail;
