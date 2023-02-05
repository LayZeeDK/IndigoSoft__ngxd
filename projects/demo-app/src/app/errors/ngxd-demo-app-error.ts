import { ErrorOptions } from './error-options';

export abstract class NgxdDemoAppError extends Error {
  constructor(message = 'NgxdDemoAppError', options?: ErrorOptions) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    super(message, options);
    this.name = 'NgxdDemoAppError';
  }
}
