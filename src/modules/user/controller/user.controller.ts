import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
import { ZodValidationPipe, IdValidationPipe } from '../pipes';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers(
    @Query(new ZodValidationPipe(searchParamsSchema)) query: SearchParamsDto,
  ) {
    return query;
  }

  @Get(':id')
  getUser(@Param('id', IdValidationPipe) id: string) {
    return 'Get user with: ' + id;
  }

  @Post()
  async addUser(
    @Body(new ZodValidationPipe(addUserSchema)) addUserDto: AddUserDto,
  ) {
    return await this.userService.createUser(addUserDto);
  }

  @Patch()
  editUser(
    @Body(new ZodValidationPipe(editUserSchema)) editUserDto: EditUserDto,
  ) {
    return editUserDto;
  }

  @Delete(':id')
  deleteUser(@Param('id', IdValidationPipe) id: string) {
    return 'delete user with: ' + id;
  }
}
