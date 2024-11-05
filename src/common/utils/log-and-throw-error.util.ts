import {
  Logger,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';

export function logAndThrowError(
  logger: Logger,
  methodName: string,
  error: any,
  ExceptionClass: new (
    ...args: any[]
  ) => HttpException = InternalServerErrorException,
): void {
  const errorMessage =
    typeof error === 'string'
      ? error
      : error?.message || 'An unexpected error occurred';

  logger.error(`Error in ${methodName}: ${errorMessage}`);

  throw new ExceptionClass({ message: errorMessage });
}
