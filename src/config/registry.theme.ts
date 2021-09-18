import { container } from 'tsyringe';
import { ChakraUiTheme } from '$/infra/app/theme/chakraUi';

container.registerSingleton('ITheme', ChakraUiTheme);
