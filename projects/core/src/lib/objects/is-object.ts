export function isObject<TValue = unknown>(
  x: unknown
): x is { [key: string | number | symbol]: TValue } {
  return x !== null && typeof x === 'object' && !Array.isArray(x);
}
