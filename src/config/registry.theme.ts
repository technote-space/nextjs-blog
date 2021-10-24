import { container } from 'tsyringe';
import { ChakraUiTheme } from '$/infra/app/theme/chakraUi';
import { ChakraUiDarkMode } from '$/infra/app/theme/chakraUiDarkMode';
import { settings } from '^/config/settings';

container.registerSingleton('ITheme', ChakraUiTheme);
container.registerSingleton('IDarkMode', ChakraUiDarkMode);
container.registerInstance('Settings', settings);
