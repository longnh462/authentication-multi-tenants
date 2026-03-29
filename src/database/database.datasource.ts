
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: `${process.env.DATABASE_HOST || 'localhost'}`,
        port: parseInt(`${process.env.DATABASE_PORT || 5432}`, 10),
        username: `${process.env.DATABASE_USER || 'postgres'}`,
        password: `${process.env.DATABASE_PASSWORD || 'root'}`,
        database: `${process.env.DATABASE_NAME || 'test'}`,
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];
