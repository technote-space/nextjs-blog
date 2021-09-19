import type { ImageProps } from '@chakra-ui/react';
import type { VFC } from 'react';
import { Image } from '@chakra-ui/react';

type Props = ImageProps;

const defaultProps: Props = {
  alt: 'thumbnail',
  objectFit: 'cover',
  boxSize: '150px',
  loading: 'lazy',
};

const Thumbnail: VFC<Props> = (props) => {
  if (!props.src) {
    return null;
  }

  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...defaultProps} {...props} />;
};

Thumbnail.displayName = 'Thumbnail';
export default Thumbnail;
