export interface V8ErrorCaptureStackTrace extends ErrorConstructor {
  /**
   * Add a stack property to the given error object that yields the stack trace
   * at the time captureStackTrace was called. Stack traces collected through
   * `Error.captureStackTrace` are immediately collected, formatted, and
   * attached to the given error object.
   *
   * @param targetObject
   * @param constructorOpt Pass in a function value. When collecting the stack
   *   trace all frames above the topmost call to this function, including that
   *   call, are left out of the stack trace. This can be useful to hide
   *   implementation details that won’t be useful to the user.
   *
   * @remarks
   * Non-standard V8 function for maintaining a stack trace.
   *
   * @see https://v8.dev/docs/stack-trace-api
   *
   * @example
   * The usual way of defining a custom error that captures a stack trace would be:
   * ```javascript
   * class MyError extends Error {
   *   constructor(message) {
   *     super(message);
   *     Error.captureStackTrace(this, MyError);
   *     // Any other initialization goes here.
   *   }
   * }
   * ```
   * Passing in `MyError` as a second argument means that the constructor call
   * to `MyError` won’t show up in the stack trace.
   */
  captureStackTrace(targetObject: Error, constructorOpt?: typeof Error.constructor): void;
}

export function isV8ErrorCaptureStackTrace(
  errorType: ErrorConstructor
): errorType is V8ErrorCaptureStackTrace {
  return (
    'captureStackTrace' in errorType &&
    typeof (errorType as V8ErrorCaptureStackTrace).captureStackTrace === 'function'
  );
}
