import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Global, Module } from '@nestjs/common';
import { environment } from '../configuration';
import {
  RABBITMQ_CONNECTION_INIT_OPTIONS,
  RABBITMQ_DEFAULT_RPC_TIMEOUT,
} from '@purrch/common/constants/core-backend-constants';

@Global()
@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: environment.rabbitmq.exchanges,
      defaultRpcTimeout: RABBITMQ_DEFAULT_RPC_TIMEOUT,
      connectionInitOptions: RABBITMQ_CONNECTION_INIT_OPTIONS,
      uri: `${environment.rabbitmq.protocol}://${environment.rabbitmq.username}:${environment.rabbitmq.password}@${environment.rabbitmq.host}:${environment.rabbitmq.port}`
    })
  ],
  exports: [RabbitMQModule]
})
export class RabbitmqModule {

}
