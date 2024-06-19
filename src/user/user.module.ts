import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [SequelizeModule.forFeature([User]), MailModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}