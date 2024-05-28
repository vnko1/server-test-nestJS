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

@Controller('users')
export class UserController {
  constructor() {}

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
  addUser(@Body(new ZodValidationPipe(addUserSchema)) addUserDto: AddUserDto) {
    return addUserDto;
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
