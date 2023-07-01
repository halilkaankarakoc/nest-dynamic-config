import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { enableDynamicConfig } from 'nest-dynamic-config';
import { ServerConfig } from './configuration/server.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await enableDynamicConfig(app);

  const serverConfig = app.get(ServerConfig);
  await app.listen(serverConfig.port, () => {
    console.log(`${serverConfig.name} listening on port ${serverConfig.port}`);
  });
}
bootstrap();
