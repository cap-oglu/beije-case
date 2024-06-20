import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { dataBaseConfig } from './database/database.config';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [UserModule, MailModule, SequelizeModule.forRoot(dataBaseConfig)],
})
export class AppModule {}
