import { Injectable, Logger } from '@nestjs/common';
import * as Minio from 'minio';
import { environment } from '@purrch/core/configuration';
import { logAndThrowError } from '@purrch/common/utils';

@Injectable()
export class MinioService {
  private readonly logger: Logger = new Logger(MinioService.name);
  private minioClient: Minio.Client;
  private bucketName: string;

  constructor() {
    this.minioClient = new Minio.Client({
      endPoint: environment.minio.endpoint,
      port: environment.minio.port,
      useSSL: environment.minio.useSSL,
      accessKey: environment.minio.accessKey,
      secretKey: environment.minio.secretKey,
    });
    this.bucketName = environment.minio.bucketName;
  }

  async createBucketIfNotExists() {
    try {
      const bucketExists = await this.minioClient.bucketExists(this.bucketName);
      if (!bucketExists) {
        await this.minioClient.makeBucket(this.bucketName);
      }
    } catch (e) {
      logAndThrowError(this.logger, this.createBucketIfNotExists.name, e);
    }
  }

  async uploadFile(file: Express.Multer.File) {
    try {
      const fileName = `${Date.now()}-${file.originalname}`;
      await this.minioClient.putObject(this.bucketName, fileName, file.buffer, file.size);
      return fileName;
    } catch (e) {
      logAndThrowError(this.logger, this.uploadFile.name, e);
    }
  }

  async getFileUrl(fileName: string) {
    try {
      return await this.minioClient.presignedUrl('GET', this.bucketName, fileName);
    } catch (e) {
      logAndThrowError(this.logger, this.getFileUrl.name, e);
    }
  }

  async deleteFile(fileName: string) {
    try {
      await this.minioClient.removeObject(this.bucketName, fileName);
    } catch (e) {
      logAndThrowError(this.logger, this.deleteFile.name, e);
    }
  }
}
