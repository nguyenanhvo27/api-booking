import { IsNotEmpty } from 'class-validator';

export class CreateRoomDto {
   @IsNotEmpty()
  room_name: string;
  
  @IsNotEmpty()
  capacity: number;

  @IsNotEmpty()
  prize: number;
 

  @IsNotEmpty()
  facilities: string;

  @IsNotEmpty()
  hotel_id: number;

  wifi: boolean;

  AC: boolean;

  heater: boolean;
  
  parking: boolean;
  pool: boolean;

  other_facilities: string;

  // @IsNotEmpty()
  imgPath: string;
}
