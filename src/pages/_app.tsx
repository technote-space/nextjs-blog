import 'reflect-metadata';
import '^/config/registry';
import type { IAppService } from '$/domain/app';
import { container } from 'tsyringe';

export default (container.resolve('IAppService') as IAppService).create();
