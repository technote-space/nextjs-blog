import type { ITheme, Props } from '$/domain/app/theme';
import type { FC, PropsWithChildren } from 'react';
import { ChakraProvider, extendTheme, ColorModeScript } from '@chakra-ui/react';
import { memo } from 'react';
import { singleton } from 'tsyringe';
import { BaseComponent } from '$/infra/shared/component';
import chakraUiConfig from '^/config/chakraUi';

@singleton()
export class ChakraUiTheme extends BaseComponent<Props> implements ITheme {
  private readonly __theme: ReturnType<typeof extendTheme>;

  public constructor() {
    super();
    this.__theme = extendTheme(chakraUiConfig);
  }

  protected getComponent(): FC<PropsWithChildren<Props>> {
    const component = memo<PropsWithChildren>(({ children }) => <ChakraProvider theme={this.__theme}>
      <ColorModeScript initialColorMode="system"/>
      {children}
    </ChakraProvider>);
    component.displayName = 'ThemeProvider';

    return component;
  }
}
