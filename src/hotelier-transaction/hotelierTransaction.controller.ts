import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Put,
    Request
  } from '@nestjs/common';
  import { HotelierTransactionService } from './hotelierTransaction.service';
  import { CreateHotelierTransactionDto } from './dto/createHotelierTransaction.dto';
  import {UpdateHotelierTransactionDto} from './dto/updateHotelierTransaction.dto';
  import {Cron} from '@nestjs/schedule'
  @Controller('hotelier_transaction')
  export class HotelierTransactionController {
    constructor(private readonly hotelierTransactionService: HotelierTransactionService) {}
  
  @Post()
  create(@Body() createHotelierTransactionDto: CreateHotelierTransactionDto) {
    return this.hotelierTransactionService.create(createHotelierTransactionDto);
  }

  @Get('/getHotelierTransaction')
  GetAll() {
    return this.hotelierTransactionService.GetAll();
  }



  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelierTransactionService.findOne(+id);
  }

  @Get('findUnpaid/:id')
  findUnpaid(@Param('id') id: string) {
    return this.hotelierTransactionService.findUnpaid(+id);
  }

  // @Patch('/load/:id')
  // load(@Param('id') id: string, 
  // @Body() updateHotelierTransactionDto:UpdateHotelierTransactionDto) {
  //   return this.hotelierTransactionService.load(+id,updateHotelierTransactionDto);
  // }

  @Put('success/:id')
  sucess(@Param('id') id: string, @Body() updateHotelierTransactionDto: UpdateHotelierTransactionDto) {
      return this.hotelierTransactionService.success(+id, updateHotelierTransactionDto);
    }
   
    @Delete('/deleteAll')
   async deleteAll(): Promise<string> {
    await this.hotelierTransactionService.deleteAll();
    return 'Xóa toàn bộ dữ liệu trong bảng Payment thành công!';
  }
}