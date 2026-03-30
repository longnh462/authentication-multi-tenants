import { Module } from '@nestjs/common';
import databaseConfig from 'src/config/database.config';
import { DataSource, DataSourceOptions } from 'typeorm';
import type { ConfigType } from '@nestjs/config';
import { TenantEntity } from 'src/modules/tenant/entities/tenant.entity';
import { TenantConnectionService } from './tenant-connection.service';

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
                    entities: [TenantEntity],
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
            },
            inject: [databaseConfig.KEY],
        },
        TenantConnectionService,
    ],
    exports: ['PUBLIC_DATA_SOURCE', TenantConnectionService],
})
export class DatabaseModule { }
