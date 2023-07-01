export const DYNAMIC_CONFIGURATION_KEY_METADATA_KEY =
  '__dynamicconfigurationkey__';

export function DynamicConfigKey(configKey: string) {
  return function (target, propertyKey: string) {
    Reflect.defineMetadata(
      `${DYNAMIC_CONFIGURATION_KEY_METADATA_KEY}.${propertyKey}`,
      {
        propertyKey,
        configKey,
      },
      target,
    );
  };
}
