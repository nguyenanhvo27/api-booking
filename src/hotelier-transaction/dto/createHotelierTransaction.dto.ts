import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateHotelierTransactionDto {
  
  @IsNotEmpty()
  total: number;

  @IsNotEmpty()
  hotel_id: number;

  @IsNotEmpty()
  user_id: number;
}
