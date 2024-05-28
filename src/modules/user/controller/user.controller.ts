import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor() {}

  @Get()
  getUsers() {
    return 'users';
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return 'Get user with: ' + id;
  }

  @Post()
  addUser() {
    return 'addUser';
  }

  @Patch()
  editUser() {
    return 'editUser';
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return 'delete user with: ' + id;
  }
}
