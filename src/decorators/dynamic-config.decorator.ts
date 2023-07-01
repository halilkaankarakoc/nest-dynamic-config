export const DYNAMIC_CONFIGURATION_METADATA_KEY = '__dynamic_configuration__';

export function DynamicConfig(options?: { path: string }) {
  return function (target: any) {
    Reflect.defineMetadata(
      DYNAMIC_CONFIGURATION_METADATA_KEY,
      { path: options?.path },
      target.prototype,
    );
  };
}
