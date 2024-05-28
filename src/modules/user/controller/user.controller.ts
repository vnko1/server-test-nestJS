import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { SearchParamsDto, searchParamsSchema } from '../dto/searchParams.dto';
import { ZodValidationPipe } from '../pipes/zodValidation.pipe';
import { IdValidationPipe } from '../pipes/idValidation.pipe';

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
