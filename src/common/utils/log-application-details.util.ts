import { Logger } from '@nestjs/common';

export function logApplicationDetails(port: number) {
  const message = `
************************************************************
*                                                          *
*   Server running on:                                     *
*   http://localhost:${port}                                  *
*                                                          *
************************************************************
*                                                          *
*   Swagger running on:                                    *
*   http://localhost:${port}/purrch/api/docs                  *
*                                                          *
************************************************************
    `;
  Logger.log(message, 'NestApplication');
}
