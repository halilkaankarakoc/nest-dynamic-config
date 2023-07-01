import { DynamicConfig, DynamicConfigKey } from 'nest-dynamic-config';

@DynamicConfig()
export class MaintenanceConfig {
  @DynamicConfigKey('maintenanceMode')
  inMaintenance: number;
}
