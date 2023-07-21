import { Test, TestingModule } from '@nestjs/testing';
import { HotelierTransactionService } from './hotelierTransaction.service';

describe('HotelierTransactionService', () => {
  let service: HotelierTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotelierTransactionService],
    }).compile();

    service = module.get<HotelierTransactionService>(HotelierTransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
