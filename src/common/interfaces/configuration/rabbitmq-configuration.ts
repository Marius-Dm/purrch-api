import { Exchange } from './exchange-rabbitmq-configuration';

export interface RabbitMQConfiguration {
  host: string;
  port: number;
  username: string;
  password: string;
  protocol: string;
  exchanges: Exchange[];
}
