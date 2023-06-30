import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionDto } from './create-transaction.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
 
  capture_id: string;
  status:string;
}
