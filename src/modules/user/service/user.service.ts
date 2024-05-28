import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';

import { AppService } from 'src/common';
import { Profile, User } from '../models';
import { AddUserDto, EditUserDto, SearchParamsDto } from '../dto';
import { Transaction } from 'sequelize';

@Injectable()
export class UserService extends AppService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Profile)
    private profileModel: typeof Profile,
    private sequelize: Sequelize,
  ) {
    super();
  }

  private async getTransaction(): Promise<Transaction> {
    return await this.sequelize.transaction();
  }

  async createUser(addUserDto: AddUserDto) {
    const transaction = await this.getTransaction();

    try {
      const user = await this.userModel.create(
        {
          username: addUserDto.username,
          email: addUserDto.email,
          role: addUserDto.role,
        },
        { transaction },
      );

      const profile = await this.profileModel.create(
        {
          firstName: addUserDto.firstName,
          lastName: addUserDto.lastName,
          state: addUserDto.state,
          userId: user.id,
        },
        { transaction },
      );

      await transaction.commit();

      return { profile, user };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async getAllUsers(searchParams: SearchParamsDto) {
    return await this.userModel.findAll({
      include: [{ model: this.profileModel, as: 'profile' }],
      where: searchParams,
    });
  }

  async getUser(id: number) {
    return this.userModel.findOne({
      include: [{ model: this.profileModel, as: 'profile' }],
      where: { id },
    });
  }

  async editUser(editUserDto: EditUserDto, id: number) {
    const transaction = await this.getTransaction();

    try {
      const user = await this.userModel.update(editUserDto, {
        where: { id },
        returning: true,
        transaction,
      });

      const profile = await this.profileModel.create(editUserDto, {
        where: { id },
        returning: true,
        transaction,
      });
      await transaction.commit();

      return { profile, user };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
