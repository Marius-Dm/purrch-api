import { Injectable, Logger } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import { environment } from '@purrch/core/configuration';
import { logAndThrowError } from '@purrch/common/utils';

@Injectable()
export class EmailService {
  private readonly logger: Logger = new Logger(EmailService.name);
  constructor() {
    sgMail.setApiKey(environment.sendgrid.apiKey);
  }

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const verificationUrl = `http://localhost:3000/purrch/api/auth/verify-email?token=${token}`;
    const msg = {
      to: email,
      from: environment.sendgrid.from,
      subject: 'Email verification',
      text: `Please verify your email by clicking on the following link: ${verificationUrl}`,
      html: `<p>Please verify your email by clicking on the following link: <a href="${verificationUrl}">${verificationUrl}</a></p>`,
    };
    try {
      await sgMail.send(msg);
    } catch (error) {
      logAndThrowError(this.logger, this.sendVerificationEmail.name, error);
    }
  }
}
