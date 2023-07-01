export const DYNAMIC_CONFIG_METADATA_KEY = '__dynamic_config__';

export function DynamicConfig(options?: { path: string }) {
  return function (target: any) {
    Reflect.defineMetadata(
      DYNAMIC_CONFIG_METADATA_KEY,
      { path: options?.path },
      target.prototype,
    );
  };
}
