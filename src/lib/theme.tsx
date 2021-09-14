import type { FC } from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import type { GlobalStyleProps } from '@chakra-ui/theme-tools';
import { mode } from '@chakra-ui/theme-tools';

const theme = extendTheme({
  styles: {
    global: (props: GlobalStyleProps) => ({
      body: {
        color: mode('gray.800', 'whiteAlpha.900')(props),
        bg: mode('orange.50', 'gray.800')(props),
      },
      main: {
        width: '100%',
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
});

const Provider: FC = ({ children }) => {
  return <ChakraProvider theme={theme}>
    {children}
  </ChakraProvider>;
};

Provider.displayName = 'Provider';
export default Provider;
