import { Module } from '@nestjs/common';
import { StatisticsModule } from './statistics/statistics.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [StatisticsModule, AuthModule],
})
export class AppModule { }
