import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class MailService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendVerificationEmail(email: string, username: string, token: string) {
    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL, // Your verified sender
      subject: 'Verify your email',
      text: `Please verify your email by clicking on the following link: ${process.env.BASE_URL}/user/verify-email/${username}/${token}`,
    };
    await sgMail.send(msg);
  }
}