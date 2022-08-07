import type { IDarkMode } from '@/domain/app/theme/darkMode';
import { useColorMode, useColorModeValue } from '@chakra-ui/react';

export class ChakraUiDarkMode implements IDarkMode {
  public useColorModeValue<T>(lightModeValue: T, darkModeValue: T): T {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useColorModeValue(lightModeValue, darkModeValue);
  }

  public toggleColorMode(): () => void {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useColorMode().toggleColorMode;
  }
}
