import type { ITheme, Props } from '$/domain/app/theme';
import type { VFC } from 'react';
import { ChakraProvider, extendTheme, localStorageManager } from '@chakra-ui/react';
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

  protected getComponent(): VFC<Props> {
    const component = memo(({ children }) => <ChakraProvider
      theme={this.__theme}
      colorModeManager={localStorageManager}
    >
      {children}
    </ChakraProvider>);
    component.displayName = 'ThemeProvider';

    return component;
  }
}
