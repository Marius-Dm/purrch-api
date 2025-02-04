import { Nack } from '@golevelup/nestjs-rabbitmq';
import { RabbitmqEvent } from '@purrch/common/types/rpc/rabbitmq-event.type';

export type LinkHashtagToPurrEvent = RabbitmqEvent<
  {
    linkHashtagToPurrData: {
      purrId: string;
      hashtags: string[];
    };
  },
  Promise< void | Nack>
>
