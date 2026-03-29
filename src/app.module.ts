import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { TenantModule } from './modules/tenant/tenant.module';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
    load: [databaseConfig],
  }), DatabaseModule, TenantModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
