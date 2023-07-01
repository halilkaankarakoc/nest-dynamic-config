import { Injectable } from '@nestjs/common';
import { MaintenanceConfig } from './configuration/maintenance.config';

@Injectable()
export class AppService {
  constructor(private readonly maintenanceConfig: MaintenanceConfig) {}
  getHello(): string {
    if (this.maintenanceConfig.inMaintenance) {
      return 'Application is in maintenance';
    }
    return 'Hello World!';
  }
}
