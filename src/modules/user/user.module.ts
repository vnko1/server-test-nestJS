import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { Profile, User } from './models';

@Module({
  controllers: [UserController],
  imports: [SequelizeModule.forFeature([User, Profile])],
  providers: [UserService],
})
export class UserModule {}
