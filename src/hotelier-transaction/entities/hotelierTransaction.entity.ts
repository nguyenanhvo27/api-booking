import { Hotel } from 'src/hotel/entities/hotel.entity';
import { User } from 'src/users/entities/user.entity';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class HotelierTransaction {
  @PrimaryGeneratedColumn()
  hotelier_transaction_id: number;

  @Column()
  total: number;

  @Column({
    nullable: true,
    enum: ['paid', 'unpaid'],
    default: 'unpaid',
  })
  status: string;


  @ManyToOne(() => User, (user) => user.__hotelierTransaction__)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'user_id' }])
  __user__: User;
  @ManyToOne(() => Hotel, (hotel) => hotel.__hotelierTransaction__)
  @JoinColumn([{ name: 'hotel_id', referencedColumnName: 'hotel_id' }])
  __hotel__: Hotel;


  @CreateDateColumn()
  created_at: Date; // Creation date

  @UpdateDateColumn()
  updated_at: Date; // Last updated date

  @DeleteDateColumn()
  deleted_at: Date; // Deletion date
}

