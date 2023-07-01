import { MaintenanceConfig } from './configuration/maintenance.config';
export declare class AppService {
    private readonly maintenanceConfig;
    constructor(maintenanceConfig: MaintenanceConfig);
    getHello(): string;
}
