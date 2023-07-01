export const DYNAMIC_CONFIG_KEY_METADATA_KEY = '__dynamicconfigkey__';

export function DynamicConfigKey(configKey: string) {
  return function (target, propertyKey: string) {
    Reflect.defineMetadata(
      `${DYNAMIC_CONFIG_KEY_METADATA_KEY}.${propertyKey}`,
      {
        propertyKey,
        configKey,
      },
      target,
    );
  };
}
