

<h3 align="center">Nestjs Dynamic Configuration Module</h3>

## Installation

```bash
$ npm install nest-dynamic-config
or
$ yarn add nest-dynamic-config
```

### Usage

```ts
import { Module } from '@nestjs/common';
import { DynamicConfigModule } from "nest-dynamic-config";

@Module({
  imports: [
    DynamicConfigModule.register({ configs: ['your-config-file-path-1', '...'], watch: true })
  ],
})
export class AppModule {}
```

```ts
import { DynamicConfig, DynamicConfigKey } from 'nest-dynamic-config';

@DynamicConfig('optional-prefix')
export class SomeConfig {
  @DynamicConfigKey('config-key')
  port: number;
}
```

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { enableDynamicConfig } from 'nest-dynamic-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await enableDynamicConfig(app);
  // ...
}

bootstrap();
```

### Usage
Working example can be found [here](https://github.com/halilkaankarakoc/nest-dynamic-config/tree/main/examples/example-01)