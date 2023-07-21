import { PartialType } from '@nestjs/mapped-types';
import { CreateHotelierTransactionDto } from './createHotelierTransaction.dto'

export class UpdateHotelierTransactionDto extends PartialType(CreateHotelierTransactionDto) {
    status:string;
}
