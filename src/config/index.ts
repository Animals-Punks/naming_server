import { config as _config } from 'dotenv';
_config({ path: __dirname + '/../../.env' });
(process as any).send = process.send || function () {};

import { appConfig } from './app.config';

import TypeOrmModuleConfig from './modules/typeorm';
import CaverjsModuleConfig from './modules/caverjs';

export { appConfig, TypeOrmModuleConfig, CaverjsModuleConfig };
