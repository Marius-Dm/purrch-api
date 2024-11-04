export const RABBITMQ_CONNECTION_TIMEOUT = 240000;
export const RABBITMQ_DEFAULT_RPC_TIMEOUT = 240000;
export const RABBITMQ_REQUEST_TIMEOUT = 240000;
export const RABBITMQ_CONNECTION_INIT_OPTIONS = {
  wait: true,
  timeout: RABBITMQ_CONNECTION_TIMEOUT,
  reject: true,
};
