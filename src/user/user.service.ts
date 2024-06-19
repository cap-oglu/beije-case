import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.entity';
import { MailService } from '../mail/mail.service';
import { randomBytes } from 'crypto';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private mailService: MailService,
  ) {}

  async register(username: string, email: string): Promise<User> {

        // Check if the username already exists
        const existingUser = await this.userModel.findOne({ where: { username } });
        if (existingUser) {
          // Throw an exception if the username is taken
          throw new ConflictException('Username is already taken');
        }
    const verificationToken = randomBytes(32).toString('hex');
    const user = await this.userModel.create({ username, email, verificationToken, isVerified: false });
    await this.mailService.sendVerificationEmail(user.email, user.username, user.verificationToken);
    return user;
  }

  async verifyEmail(username: string, token: string): Promise<boolean> {
    const user = await this.userModel.findOne({ where: { username } });
    if (!user) return false;
    if (user.verificationToken !== token) return false;
    user.isVerified = true;
    await user.save();
    return true;
  }

  async checkVerification(username: string): Promise<boolean> {
    const user = await this.userModel.findOne({ where: { username } });
    if (!user) return false;
    return user.isVerified;
  }
  //for seeing all users in database - geçici olarak eklendi
  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }
}
