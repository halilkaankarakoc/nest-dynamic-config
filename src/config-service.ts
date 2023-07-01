import { Inject, Injectable } from '@nestjs/common';
import * as yamlConfig from 'yaml-config';
import * as fs from 'fs';
import { DynamicConfigOptions } from './dynamic-config.module';

@Injectable()
export class ConfigService {
  private configs: Record<string, any>;

  constructor(
    @Inject('DYNAMIC_CONFIG_OPTIONS')
    private readonly dynamicConfigOptions: DynamicConfigOptions,
  ) {
    this.readAll();
  }

  readAll() {
    this.configs = this.dynamicConfigOptions.configFiles
      .map((configFile) => this.readFileContent(configFile))
      .reduce((acc, curr) => ({ ...acc, ...curr }), {});
  }

  private readFileContent(configFile: string) {
    const fileExtension = configFile.split('.').at(-1);

    if (!['yaml', 'yml', 'json'].includes(fileExtension)) {
      throw new Error(`Unsupported file extension, ${fileExtension}`);
    }

    let fileContent: Record<string, any>;
    if (fileExtension === 'yaml' || 'yml') {
      fileContent = this.readYaml(configFile);
    }

    if (fileExtension === 'json') {
      fileContent = this.readJson(configFile);
    }

    return fileContent;
  }

  get(key: string) {
    return this.flatAccess(this.configs, key);
  }

  private flatAccess(object: Record<string, any>, path: string) {
    return path
      .split('.')
      .reduce((acc, accessor) => (acc ? acc[accessor] : undefined), object);
  }

  private readYaml(path: string) {
    return yamlConfig.readConfig(path);
  }

  private readJson(path: string) {
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
  }
}
