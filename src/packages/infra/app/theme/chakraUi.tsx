import type { ITheme, Props } from '$/domain/app/theme';
import type { GlobalStyleProps } from '@chakra-ui/theme-tools';
import type { VFC } from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { memo } from 'react';
import SimpleReactLightbox from 'simple-react-lightbox';
import { singleton } from 'tsyringe';
import { BaseComponent } from '$/infra/shared/component';

@singleton()
export class ChakraUiTheme extends BaseComponent<Props> implements ITheme {
  public constructor() {
    super();
  }

  private readonly theme = extendTheme({
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

  protected getComponent(): VFC<Props> {
    const component = memo(({ children }) => {
      return <ChakraProvider theme={this.theme}>
        <SimpleReactLightbox>
          {children}
        </SimpleReactLightbox>
      </ChakraProvider>;
    });
    component.displayName = 'ThemeProvider';

    return component;
  }
}
