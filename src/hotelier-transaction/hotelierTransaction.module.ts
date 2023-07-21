import { Module } from '@nestjs/common';
import { HotelierTransactionService } from './hotelierTransaction.service';
import { HotelierTransactionController } from './hotelierTransaction.controller';
import { HotelierTransaction } from './entities/hotelierTransaction.entity';
import {Hotel} from 'src/hotel/entities/hotel.entity'
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([HotelierTransaction,Hotel,User])],
  controllers: [HotelierTransactionController],
  providers: [HotelierTransactionService]
})
export class HotelierTransactionModule {

}
