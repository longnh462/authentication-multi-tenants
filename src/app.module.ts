import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './src/modules/user/user.module';
import { AuthModule } from './src/modules/auth/auth.module';
import { SessionModule } from './src/modules/session/session.module';
import { CompanyModule } from './src/modules/company/company.module';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    UserModule,
    AuthModule,
    SessionModule,
    CompanyModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
