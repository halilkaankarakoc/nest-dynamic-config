"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const nest_dynamic_config_1 = require("nest-dynamic-config");
const server_config_1 = require("./configuration/server.config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await (0, nest_dynamic_config_1.enableDynamicConfig)(app);
    const serverConfig = app.get(server_config_1.ServerConfig);
    await app.listen(serverConfig.port, () => {
        console.log(`${serverConfig.name} listening on port ${serverConfig.port}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map