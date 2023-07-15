import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  Query,
  Put,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { reserveValidator } from './dto/date-validate.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async create(
    @Body() createReservationDto: CreateReservationDto,
    @Request() req,
  ) {
    await reserveValidator(createReservationDto);

    return this.reservationService.create(
      createReservationDto,
      req.user.userId,
    );
  }

  @Get('')
  findAll(
    @Request() req,
    @Query()
    filter: {
      pageSize?: number;
      pageNumber?: number;
    },
  ) {
    return this.reservationService.findAll(req.user.userId, filter);
  }

  // Admin
  @Get('/admin')
  async getAll() {
    return await this.reservationService.adminFindAll();
  }
  //// hotelier
  @Get('/byHotel/:hotelId')
  getMyReservation(@Param('hotelId') id: number) {
    return this.reservationService.getReservationById(id);
  }
  @Get('/getSuccess')
  async getSuccess() {
    return await this.reservationService.getSuccess();
  }
  /////// USER
  @Put('cancelReservation/:id')
  cancelReservation(@Param('id') id: string, @Body() UpdateReservationDto: UpdateReservationDto) {
    return this.reservationService.cancelReservation(+id, UpdateReservationDto);
  }

  @Put('accept/:id')
  accept(@Param('id') id: string, @Body() UpdateReservationDto: UpdateReservationDto) {
      return this.reservationService.accept(+id, UpdateReservationDto);
    }

    @Put('success/:id')
    success(@Param('id') id: string, @Body() UpdateReservationDto: UpdateReservationDto) {
        return this.reservationService.success(+id, UpdateReservationDto);
      }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    // await reserveValidator(updateReservationDto);
    return this.reservationService.update(+id, updateReservationDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.reservationService.remove(+id);
  }


}
