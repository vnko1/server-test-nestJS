import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DatabaseError } from 'sequelize';

import { AppService } from 'src/common';

@Catch()
export class DBExceptionFilter extends AppService implements ExceptionFilter {
  constructor() {
    super();
  }

  catch(exception: DatabaseError, host: ArgumentsHost) {
    const response = this.response(host);
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response(exception.name, exception.message, status);
  }
}
