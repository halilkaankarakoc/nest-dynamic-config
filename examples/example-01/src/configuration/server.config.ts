import { DynamicConfig, DynamicConfigKey } from 'nest-dynamic-config';

@DynamicConfig('server')
export class ServerConfig {
  @DynamicConfigKey('port')
  port: number;
  @DynamicConfigKey('name')
  name: string;
}
