"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const server_config_1 = require("./configuration/server.config");
const nest_dynamic_config_1 = require("nest-dynamic-config");
const path = require("path");
const process = require("process");
const maintenance_config_1 = require("./configuration/maintenance.config");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nest_dynamic_config_1.DynamicConfigModule.register({
                configFiles: [path.join(process.cwd(), 'config', 'config.json')],
                watch: true,
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, server_config_1.ServerConfig, maintenance_config_1.MaintenanceConfig],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map