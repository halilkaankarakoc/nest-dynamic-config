import { INestApplication } from '@nestjs/common';
import { DynamicConfigRegistration } from './dynamic-config-registration';

export const enableDynamicConfig = async (app: INestApplication) => {
  const dynamicConfigRegistration = app.get(DynamicConfigRegistration);
  dynamicConfigRegistration.register();
  return app;
};
