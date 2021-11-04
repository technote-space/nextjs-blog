import type { SystemProps, BoxProps, FlexProps, ImageProps, ListProps, ListItemProps } from '@chakra-ui/react';
import { chakra, Box, Flex, Image, List, ListItem, IconButton, Icon, WrapItem, HStack, Text } from '@chakra-ui/react';

export type StyleProps = SystemProps;
export const Heading2 = chakra.h2;
export const Heading3 = chakra.h3;
export const Time = chakra('time');
export const Footer = chakra.footer;
export const Header = chakra.header;
export const Article = chakra.article;

export { Box, Flex, Image, List, ListItem, IconButton, Icon, WrapItem, HStack, Text };
export type { BoxProps, FlexProps, ImageProps, ListProps, ListItemProps };
