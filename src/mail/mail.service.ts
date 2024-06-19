import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';


@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // You can change the service name based on your email provider
      auth: {
        user: process.env.EMAIL_USER ,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendVerificationEmail(email: string, username: string, token: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER , // Sender address
      to: email, // List of recipients
      subject: 'Verify your email', // Subject line
      text: `Please verify your email by clicking on the following link: http://localhost:3000/user/verify-email/${username}/${token}`, // Plain text body
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email' + error.message);
    }
  }
}
