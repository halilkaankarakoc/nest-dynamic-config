"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerConfig = void 0;
const nest_dynamic_config_1 = require("nest-dynamic-config");
let ServerConfig = exports.ServerConfig = class ServerConfig {
};
__decorate([
    (0, nest_dynamic_config_1.DynamicConfigKey)('port'),
    __metadata("design:type", Number)
], ServerConfig.prototype, "port", void 0);
__decorate([
    (0, nest_dynamic_config_1.DynamicConfigKey)('name'),
    __metadata("design:type", String)
], ServerConfig.prototype, "name", void 0);
exports.ServerConfig = ServerConfig = __decorate([
    (0, nest_dynamic_config_1.DynamicConfig)('server')
], ServerConfig);
//# sourceMappingURL=server.config.js.map