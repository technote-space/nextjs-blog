import type { extendTheme } from '@chakra-ui/react';
import type { GlobalStyleProps } from '@chakra-ui/theme-tools';
import { createBreakpoints, mode } from '@chakra-ui/theme-tools';

export default {
  styles: {
    global: (props: GlobalStyleProps) => ({
      body: {
        color: mode('gray.800', 'whiteAlpha.900')(props),
        bg: mode('orange.50', 'gray.800')(props),
      },
      main: {
        width: '100%',
      },
      header: {
        bg: mode('white', 'gray.800')(props),
      },
      footer: {
        bg: mode('white', 'gray.800')(props),
      },
    }),
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'teal',
      },
      sizes: {
        xs: { minW: 120 },
        sm: { minW: 120 },
        md: { minW: 120 },
        lg: { minW: 120 },
      },
    },
  },
  breakpoints: createBreakpoints({
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  }),
  fonts: {
    body: '"Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
  },
  initialColorMode: 'system',
  useSystemColorMode: false,
} as Parameters<typeof extendTheme>[number];
