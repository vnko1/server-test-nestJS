import { PipeTransform, BadRequestException } from '@nestjs/common';

export class IdValidationPipe implements PipeTransform {
  transform(value: any) {
    if (isNaN(value)) throw new BadRequestException('Wrong id');
    return value;
  }
}
