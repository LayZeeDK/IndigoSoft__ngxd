import { isV8ErrorCaptureStackTrace } from './v8-error-capture-stack-trace';

import { ErrorOptions } from './error-options';

export abstract class NgxdFormsError extends Error {
  constructor(message = 'NgxdFormsError', options?: ErrorOptions) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    super(message, options);

    if (isV8ErrorCaptureStackTrace(Error)) {
      Error.captureStackTrace(this, this.constructor);
    }

    this.name = 'NgxdFormsError';
  }
}
