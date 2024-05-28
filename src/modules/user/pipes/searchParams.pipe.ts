// import { ZodSchema } from 'zod';
import { PipeTransform, BadRequestException } from '@nestjs/common';
import { searchParamsSchema } from '../dto/searchParams.dto';

export class SearchParamsValidationPipe implements PipeTransform {
  private searchParamsSchema = searchParamsSchema;

  transform(value: unknown) {
    try {
      const parsedValue = this.searchParamsSchema.parse(value);
      return parsedValue;
    } catch (error) {
      throw new BadRequestException(error?.issues[0]?.message);
    }
  }
}
