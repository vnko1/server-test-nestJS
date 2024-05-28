import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';

@Module({ controllers: [UserController], imports: [], providers: [] })
export class UserModule {}
