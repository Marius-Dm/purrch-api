import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUser } from '@purrch/common/interfaces';

export const LoggedUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request: RequestWithUser = ctx
      .switchToHttp()
      .getRequest<RequestWithUser>();
    return request.user;
  },
);
