import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import {
  SearchParamsDto,
  searchParamsSchema,
  AddUserDto,
  addUserSchema,
  EditUserDto,
  editUserSchema,
} from '../dto';
import { ZodValidationPipe } from '../pipes';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers(
    @Query(new ZodValidationPipe(searchParamsSchema)) query: SearchParamsDto,
  ) {
    return await this.userService.getAllUsers(query);
  }

  @Get('profiles')
  async getProfiles() {
    return await this.userService.getProfiles();
  }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUser(id);
  }

  @Post()
  async addUser(
    @Body(new ZodValidationPipe(addUserSchema)) addUserDto: AddUserDto,
  ) {
    return await this.userService.createUser(addUserDto);
  }

  @Patch(':id')
  @HttpCode(204)
  async editUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(editUserSchema)) editUserDto: EditUserDto,
  ) {
    return await this.userService.editUser(editUserDto, id);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteUser(id);
  }
}
