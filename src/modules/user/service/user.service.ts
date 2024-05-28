import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { AppService } from 'src/common';
import { Profile, User } from '../models';
import { AddUserDto, SearchParamsDto } from '../dto';

@Injectable()
export class UserService extends AppService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Profile)
    private profileModel: typeof Profile,
  ) {
    super();
  }

  async createUser(addUserDto: AddUserDto) {
    const user = await this.userModel.create(addUserDto);
    const profile = this.profileModel.create(addUserDto);

    return { profile, user };
  }

  async getAllUsers(searchParams: SearchParamsDto) {
    return await this.userModel.findAll({
      include: this.profileModel,
      where: searchParams,
    });
  }
}
