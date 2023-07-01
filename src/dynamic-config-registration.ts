import { Inject, Injectable } from '@nestjs/common';
import { DynamicConfigOptions } from './dynamic-config.module';
import { DiscoveryService } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { DYNAMIC_CONFIG_METADATA_KEY } from './decorators/dynamic-config-key.decorator';
import { ConfigService } from './config-service';
import { DYNAMIC_CONFIG_KEY_METADATA_KEY } from './decorators/dynamic-config.decorator';
import * as fs from 'fs';

@Injectable()
export class DynamicConfigRegistration {
  constructor(
    @Inject('DYNAMIC_CONFIG_OPTIONS')
    private readonly dynamicConfigOptions: DynamicConfigOptions,
    private readonly discoveryService: DiscoveryService,
    private readonly configReader: ConfigService,
  ) {}

  private configure() {
    const dynamicConfigInstancesAndMetadataKeys = this.discoveryService
      .getProviders()
      .filter(this.isDynamicConfigCls)
      .reduce((acc, curr) => {
        const metadata = this.getMetadataKeys(curr);
        acc.set(curr.instance, metadata);
        return acc;
      }, new Map());

    for (const [
      instance,
      metadataKeys,
    ] of dynamicConfigInstancesAndMetadataKeys) {
      const configurationPrefix = Reflect.getMetadata(
        metadataKeys.find((e) => e.includes(DYNAMIC_CONFIG_METADATA_KEY)),
        instance,
      ).prefix;
      const configKeys = metadataKeys
        .filter((e) => e.includes(DYNAMIC_CONFIG_KEY_METADATA_KEY))
        .map((e) => Reflect.getMetadata(e, instance));

      const retrievedConfigurations = configKeys.reduce(
        (acc, { configKey, propertyKey }) => ({
          ...acc,
          [propertyKey]:
            typeof instance[propertyKey] === 'object'
              ? {
                  ...instance[propertyKey],
                  ...(this.configReader.get(
                    configurationPrefix
                      ? `${configurationPrefix}.${configKey}`
                      : configKey,
                  ) as any),
                }
              : this.configReader.get(
                  configurationPrefix
                    ? `${configurationPrefix}.${configKey}`
                    : configKey,
                ),
        }),
        {},
      );

      for (const key in retrievedConfigurations) {
        instance[key] = retrievedConfigurations[key];
      }
    }
  }

  register() {
    this.configure();
    this.watchConfigFiles(() => {
      this.configReader.readAll();
      this.configure();
    });
  }

  private watchConfigFiles(cb: any) {
    if (this.dynamicConfigOptions.watch) {
      this.dynamicConfigOptions.configFiles.forEach((configFile) => {
        fs.watchFile(configFile, () => {
          cb();
        });
      });
    }
  }
  private isDynamicConfigCls(wrapper: InstanceWrapper) {
    const { instance } = wrapper;
    const prototype = instance && Object.getPrototypeOf(instance);
    if (!instance || !prototype) {
      return false;
    }

    try {
      return Reflect.hasMetadata(DYNAMIC_CONFIG_METADATA_KEY, instance);
    } catch (error) {
      return false;
    }
  }

  private getMetadataKeys(wrapper: InstanceWrapper) {
    const { instance } = wrapper;
    return Reflect.getMetadataKeys(instance);
  }
}
