import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateHotelierTransactionDto {
  @IsNotEmpty()
  total: number;

  @IsNotEmpty()
  money_pay: number;

  @IsNotEmpty()
  hotel_id: number;

}
