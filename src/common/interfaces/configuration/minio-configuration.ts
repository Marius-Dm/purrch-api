export interface MinioConfiguration {
  accessKey: string;
  secretKey: string;
  endpoint: string;
  useSSL: boolean;
  port: number;
  bucketName: string;
}