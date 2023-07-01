export const DYNAMIC_CONFIG_METADATA_KEY = '__dynamic_config__';

export function DynamicConfigKey(options?: { prefix: string }) {
  return function (target: any) {
    Reflect.defineMetadata(
      DYNAMIC_CONFIG_METADATA_KEY,
      { prefix: options?.prefix },
      target.prototype,
    );
  };
}
