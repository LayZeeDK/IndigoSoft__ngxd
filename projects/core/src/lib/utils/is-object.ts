export function isObject(x: unknown): x is { [key: string | number | symbol]: unknown } {
  return x !== null && typeof x === 'object' && !Array.isArray(x);
}
