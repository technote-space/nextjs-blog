import 'reflect-metadata';
import '^/config/registry';
import type { IAppService } from '$/domain/app';
import { container } from 'tsyringe';

const App = (container.resolve('IAppService') as IAppService).create();

export default App;
