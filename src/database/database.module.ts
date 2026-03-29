import { Module } from '@nestjs/common';
import databaseConfig from 'src/config/database.config';
import { DataSource, DataSourceOptions } from 'typeorm';
import type { ConfigType } from '@nestjs/config';
import { TenantEntity } from 'src/modules/tenant/entities/tenant.entity';

@Module({
    providers: [
        {
            provide: 'PUBLIC_DATA_SOURCE',
            useFactory: async (
                cfg: ConfigType<typeof databaseConfig>,
            ) => {
                const ds = new DataSource({
                    type: 'postgres',
                    url: cfg.url,
                    host: cfg.host,
                    port: cfg.port,
                    username: cfg.username,
                    password: cfg.password,
                    database: cfg.name,
                    schema: 'public',
                    entities: [TenantEntity],      // chỉ public entities
                    synchronize: false,
                    logging: process.env.NODE_ENV !== 'production',
                    extra: {
                        max: cfg.maxConnections,
                        ssl: cfg.sslEnabled
                            ? { rejectUnauthorized: cfg.rejectUnauthorized }
                            : undefined,
                    },

                } as DataSourceOptions);
                return ds.initialize();
            }
        }
    ],
    exports: ['PUBLIC_DATA_SOURCE'],
})
export class DatabaseModule { }
