import { ErrorOptions } from './error-options';

export abstract class NgxdError extends Error {
  constructor(message = 'NgxdError', options?: ErrorOptions) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    super(message, options);

    this.name = 'NgxdError';
  }
}
