import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, LessThan, MoreThan, Repository } from 'typeorm';
import { CreateHotelierTransactionDto } from './dto/createHotelierTransaction.dto';
import { HotelierTransaction } from './entities/hotelierTransaction.entity';
import { User } from 'src/users/entities/user.entity';
import { Hotel } from 'src/hotel/entities/hotel.entity';
import { UpdateHotelierTransactionDto } from './dto/updateHotelierTransaction.dto';
import { STATUS } from './enum';
import { async } from 'rxjs';


@Injectable()
export class HotelierTransactionService {
    constructor(
        @InjectRepository(HotelierTransaction)
        private hotelierTransactionRepository: Repository<HotelierTransaction>,
        
        @InjectRepository(Hotel)
        private hotelRepository: Repository<Hotel>,
       @InjectRepository(User)
        private userRepository: Repository<User>,
       ) {}

       async create(createHotelierTransactionDto: CreateHotelierTransactionDto) {
        try {
          const newHotelierTransaction = this.hotelierTransactionRepository.create(createHotelierTransactionDto);
          const hotel = await this.hotelRepository.findOneOrFail({
            where:{
              hotel_id: createHotelierTransactionDto.hotel_id,
            }
          });
          const user = await this.userRepository.findOneOrFail({
            where:{
              user_id:createHotelierTransactionDto.user_id,
            }
          })

          newHotelierTransaction.__hotel__= hotel;
          newHotelierTransaction.__user__ = user;
          return await this.hotelierTransactionRepository.save(newHotelierTransaction);
        } catch (error) {
          throw new HttpException({ message: error }, HttpStatus.BAD_REQUEST);
        }
      }

      async findOne(id: number) {
   
        try {
          const hotelierTransaction = await this.hotelierTransactionRepository.findOne({
            where: {
              hotelier_transaction_id: id,
            },
            
            relations: { 
              __hotel__: {
                __user__: true,
                __reservations__: true,
              },
            },
            
          });
          console.log(id);
          return hotelierTransaction;
        } catch (error) {
          throw new HttpException(
            { message: 'Could not find entity' },
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      
      async GetAll() {
        return await this.hotelierTransactionRepository.find({
          order: { updated_at: 'DESC' },
          where: {
            status:In(['unpaid','paid']),
            __hotel__: {
              __user__: {
               
              },
            },
          },
          relations: {
            __hotel__: true,
            __user__:true,
          },
        });
      }
      async load(id: number, updateHotelierTransactionDto:UpdateHotelierTransactionDto )
      {
        try {
          let hotelier_transaction: HotelierTransaction = await this.findOne(id);
          let update = {
            ...hotelier_transaction,
            ...updateHotelierTransactionDto,
          }
          await this.hotelierTransactionRepository.save(update);
        } catch (error) {
          throw new HttpException({ message: error }, HttpStatus.BAD_REQUEST);
        }
      }

      async findUnpaid(id: number) {
   
        try {
          const hotelierTransaction = await this.hotelierTransactionRepository.findOne({
            where: {
              hotelier_transaction_id: id,
              status: STATUS.unpaid,
            },
            
            relations: { 
              __hotel__: {
                __user__: true,
                __reservations__: true,
              },
            },
            
          });
          console.log(id);
          return hotelierTransaction;
        } catch (error) {
          throw new HttpException(
            { message: 'Could not find entity' },
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      async success(id: number, updateHotelierTransaction: UpdateHotelierTransactionDto) {
    
        try {
          let hotelierTransaction = await this.findUnpaid(id);
          
          if (hotelierTransaction.status) {
            hotelierTransaction.status = 'paid';
          }
          let update = {
            ...hotelierTransaction,
            ...UpdateHotelierTransactionDto,
          };
          return this.hotelierTransactionRepository.save(update);
        } catch (error) {
          throw new HttpException({ message: error }, HttpStatus.BAD_REQUEST);
        }
      }
      async deleteAll(): Promise<void>{
        await this.hotelierTransactionRepository.clear();
      }
}
