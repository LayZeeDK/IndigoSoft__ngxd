export function getConstructor(x: object): typeof Object.constructor {
  return Object.getPrototypeOf(x).constructor;
}
