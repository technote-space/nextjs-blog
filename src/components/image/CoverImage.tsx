import type { BoxProps, ImageProps } from '@/components/wrap';
import type { FC } from 'react';
import { Box, Image } from '@/components/wrap';

type Props = ImageProps & {
  innerProps?: BoxProps
};

const defaultProps: ImageProps = {
  alt: 'thumbnail',
  objectFit: 'contain',
  width: '100%',
  height: [200, 220, 260, 260],
  loading: 'lazy',
  flexShrink: 0,
  filter: 'blur(5px)',
  opacity: 0.5,
};

const getImageProps = (props: Props): ImageProps => {
  return {
    ...props,
    htmlWidth: props.htmlWidth ?? (typeof props.width === 'number' ? props.width : Array.isArray(props.width) ? (props.width[0] as number) : undefined),
    htmlHeight: props.htmlHeight ?? (typeof props.height === 'number' ? props.height : Array.isArray(props.height) ? (props.height[0] as number) : undefined),
    width: props.width ?? props.htmlWidth,
    height: props.height ?? props.htmlHeight,
  };
};

const getBoxProps = (props: Props): BoxProps => {
  return {
    width: props.width ?? props.htmlWidth,
    height: props.height ?? props.htmlHeight,
    backgroundColor: '#ccc',
    opacity: props.opacity,
    filter: props.filter,
  };
};

const getInnerBoxProps = (innerProps?: BoxProps): BoxProps => {
  return {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'auto',
    translateX: '-50%',
    translateY: '-50%',
    fontSize: ['1.3em', '1.5em', '1.8em', '1.8em'],
    lineHeight: ['1.2em', '1.4em', '1.5em', '1.5em'],
    fontWeight: 'bold',
    color: '#545454',
    textShadow: '2px 2px 5px whitesmoke',
    width: ['90%', '90%', '85%', '85%'],
    ...innerProps,
  };
};

const CoverImage: FC<Props> = ({ children, innerProps, ...props }) => {
  if (!props.src) {
    return <Box position="relative">
      <Box {...getBoxProps({ ...defaultProps, ...props })} />
      <Box {...getInnerBoxProps(innerProps)}>{children}</Box>
    </Box>;
  }

  return <Box position="relative">
    {/* eslint-disable-next-line jsx-a11y/alt-text */}
    <Image {...getImageProps({ ...defaultProps, ...props })} />
    <Box {...getInnerBoxProps(innerProps)}>{children}</Box>
  </Box>;
};

CoverImage.displayName = 'CoverImage';
export default CoverImage;
