import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { SessionModule } from './modules/session/session.module';
import { CompanyModule } from './modules/company/company.module';
import databaseConfig from './config/database.config';
import { ConfigType } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [databaseConfig.KEY],
      useFactory: (config: ConfigType<typeof databaseConfig>) => ({
        type: 'postgres',
        url: config.url,
        host: config.host,
        port: config.port,
        username: config.username,
        password: config.password,
        database: config.name,
        synchronize: config.synchronize ?? false,
        autoLoadEntities: true,
        extra: {
          max: config.maxConnections,
          ssl: config.sslEnabled
            ? {
                rejectUnauthorized: config.rejectUnauthorized ?? false,
                ca: config.ca ?? undefined,
                key: config.key ?? undefined,
                cert: config.cert ?? undefined,
              }
            : undefined,
        },
      }),
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
