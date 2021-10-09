import type { Settings } from '$/domain/app/settings';
import type { ITheme, Props } from '$/domain/app/theme';
import type { GlobalStyleProps } from '@chakra-ui/theme-tools';
import type { VFC } from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { createBreakpoints, mode } from '@chakra-ui/theme-tools';
import { memo } from 'react';
import { inject, singleton } from 'tsyringe';
import { BaseComponent } from '$/infra/shared/component';

@singleton()
export class ChakraUiTheme extends BaseComponent<Props> implements ITheme {
  private readonly __theme: ReturnType<typeof extendTheme>;

  public constructor(@inject('Settings') settings: Settings) {
    super();

    this.__theme = extendTheme({
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
      breakpoints: createBreakpoints(settings.breakpoints ?? {
        sm: '30em',
        md: '48em',
        lg: '62em',
        xl: '80em',
        '2xl': '96em',
      }),
      fonts: {
        body: '"Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
      },
    });
  }

  protected getComponent(): VFC<Props> {
    const component = memo(({ children }) => <ChakraProvider theme={this.__theme}>
      {children}
    </ChakraProvider>);
    component.displayName = 'ThemeProvider';

    return component;
  }
}
