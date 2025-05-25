import { camelCase, isArray, isObject, transform } from "lodash-es";

export type CamelizeInput = Record<string, unknown>;

export const mapToCamelCase = <T extends object>(
  obj: T
): T => {
  return transform(obj, (acc: Record<string, unknown>, value, key, target) => {
    const camelKey = isArray(target) ? String(key) : camelCase(String(key));

    acc[camelKey] = isObject(value) ? mapToCamelCase(value as object) : value;
  }) as T;
};

export default mapToCamelCase;