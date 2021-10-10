import type { IAppService } from '$/domain/app';
import 'reflect-metadata';
import '^/config/registry';
import { container } from 'tsyringe';
import '../../public/nprogress.css';

export default (container.resolve('IAppService') as IAppService).create();
