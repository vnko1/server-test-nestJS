import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { SearchParamsDto } from '../dto/searchParams.dto';
import { SearchParamsValidationPipe } from '../pipes/searchParams.pipe';

@Controller('users')
export class UserController {
  constructor() {}

  @Get()
  getUsers(@Query(SearchParamsValidationPipe) query: SearchParamsDto) {
    return query;
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
