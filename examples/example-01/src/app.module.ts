import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServerConfig } from './configuration/server.config';
import { DynamicConfigModule } from 'nest-dynamic-config';
import * as path from 'path';
import * as process from 'process';
import { MaintenanceConfig } from './configuration/maintenance.config';

@Module({
  imports: [
    DynamicConfigModule.register({
      configFiles: [path.join(process.cwd(), 'config', 'config.json')],
      watch: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ServerConfig, MaintenanceConfig],
})
export class AppModule {}
