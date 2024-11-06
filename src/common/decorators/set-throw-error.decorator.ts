import { SetMetadata } from '@nestjs/common';

export const SetThrowError = (throwError: boolean) =>
  SetMetadata('throwError', throwError);
