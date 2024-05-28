import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { DatabaseError } from 'sequelize';

import { AppService } from 'src/common';

@Catch()
export class DBExceptionFilter extends AppService implements ExceptionFilter {
  constructor() {
    super();
  }

  catch(exception: DatabaseError, host: ArgumentsHost) {
    const response = this.response(host);

    response(exception.name, exception.message, 400);
  }
}
