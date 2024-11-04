import { Exchange } from '../interfaces/configuration/exchange-rabbitmq-configuration';

export function parseRabbitMQExchanges(str: string): Exchange[] {
  return str.split(';').map<Exchange>((exchange: string) => {
    const [name, type] = exchange.split(':', 2);
    return {
      name,
      type,
    };
  });
}
