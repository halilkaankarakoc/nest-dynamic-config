import { DynamicModule, Global, Module } from '@nestjs/common';
import { DynamicConfigRegistration } from './dynamic-config-registration';
import { DiscoveryModule } from '@nestjs/core';
import { ConfigService } from './config-service';

export interface DynamicConfigOptions {
  configFiles: string[];
  watch?: boolean;
}

@Global()
@Module({})
export class DynamicConfigModule {
  static register(options: DynamicConfigOptions): DynamicModule {
    return {
      module: DynamicConfigModule,
      imports: [DiscoveryModule],
      providers: [
        DynamicConfigRegistration,
        ConfigService,
        { provide: 'DYNAMIC_CONFIG_OPTIONS', useValue: options },
      ],
      exports: [ConfigService],
    };
  }
}
