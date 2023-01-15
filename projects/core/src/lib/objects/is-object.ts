export function isObject<T extends { [P in keyof T]: T[K] }, K extends keyof T = keyof T>(
  x: unknown
): x is { [P in keyof T]: T[K] } {
  return x !== null && typeof x === 'object' && !Array.isArray(x);
}
