import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

const baseOptions = {
  type: 'postgres' as const,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT
    ? parseInt(process.env.DATABASE_PORT, 10)
    : 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: process.env.NODE_ENV !== 'production',
  extra: {
    max: 5,
    ssl:
      process.env.DATABASE_SSL_ENABLED === 'true'
        ? {
          rejectUnauthorized:
            process.env.DATABASE_REJECT_UNAUTHORIZED === 'true',
          ca: process.env.DATABASE_CA ?? undefined,
          key: process.env.DATABASE_KEY ?? undefined,
          cert: process.env.DATABASE_CERT ?? undefined,
        }
        : undefined,
  },

}

// CLI DataSource cho public schema (tenants registry)
export const PublicDataSource = new DataSource({
  ...baseOptions,
  schema: 'public',
  entities: ['src/modules/tenant/entities/*.entity.ts'],
  migrations: ['src/database/migrations/public/*.ts'],
} as DataSourceOptions);

// CLI DataSource cho tenant schemas
// Dùng: TENANT_SCHEMA=tenant_abc npm run migration:tenant:run
export const TenantDataSource = new DataSource({
  ...baseOptions,
  schema: process.env.TENANT_SCHEMA ?? 'tenant_template',
  entities: [
    'src/modules/user/entities/*.entity.ts',
    'src/modules/auth/entities/*.entity.ts',
  ],
  migrations: ['src/database/migrations/tenant/*.ts'],
} as DataSourceOptions);