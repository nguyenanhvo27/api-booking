import { Module } from '@nestjs/common';
import { HotelierTransactionService } from './hotelier-transaction.service';

@Module({
  providers: [HotelierTransactionService]
})
export class HotelierTransactionModule {}
