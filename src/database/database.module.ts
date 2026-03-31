import { Module } from '@nestjs/common';
import databaseConfig from 'src/config/database.config';
import { DataSource, DataSourceOptions } from 'typeorm';
import type { ConfigType } from '@nestjs/config';

@Module({
    providers: [
        {
            provide: 'DATA_SOURCE',
            useFactory: async (
                cfg: ConfigType<typeof databaseConfig>,
            ): Promise<DataSource> => {
                const ds = new DataSource({
                    type: 'postgres',
                    url: cfg.url,
                    host: cfg.host,
                    port: cfg.port,
                    username: cfg.username,
                    password: cfg.password,
                    database: cfg.name,
                    entities: ['src/**/*.entity.ts'],
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
    ],
    exports: ['DATA_SOURCE'],
})
export class DatabaseModule { }
