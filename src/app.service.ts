import { Injectable } from '@nestjs/common';
import {} from 'cron'
@Injectable()
export class AppService  {
  getHello(): string {
    return 'App is running!';
  }
}
