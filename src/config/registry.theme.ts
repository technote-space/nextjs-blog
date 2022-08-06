import { container } from 'tsyringe';
import { settings } from '@/config/settings';
import { ChakraUiTheme } from '@/infra/app/theme/chakraUi';
import { ChakraUiDarkMode } from '@/infra/app/theme/chakraUiDarkMode';

container.registerSingleton('ITheme', ChakraUiTheme);
container.registerSingleton('IDarkMode', ChakraUiDarkMode);
container.registerInstance('Settings', settings);
