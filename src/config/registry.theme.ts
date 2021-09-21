import { container } from 'tsyringe';
import { ChakraUiTheme } from '$/infra/app/theme/chakraUi';
import { settings } from '^/config/settings';

container.registerSingleton('ITheme', ChakraUiTheme);
container.registerInstance('Settings', settings);
