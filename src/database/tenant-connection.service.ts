import {
  Inject,
  Injectable,
  Logger,
  OnApplicationShutdown,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import databaseConfig from 'src/config/database.config';

@Injectable()
export class TenantConnectionService implements OnApplicationShutdown {
  private readonly logger = new Logger(TenantConnectionService.name);

  // Cache: tenantSlug → DataSource initial
  private readonly pool = new Map<string, DataSource>();

  constructor(
    @Inject('PUBLIC_DATA_SOURCE')
    private readonly publicDs: DataSource,

    @Inject(databaseConfig.KEY)
    private readonly dbConfig: ConfigType<typeof databaseConfig>,
  ) {}

  async getConnection(tenantSlug: string): Promise<DataSource> {
    // Trả về connection đã cache nếu có
    if (this.pool.has(tenantSlug)) {
      return this.pool.get(tenantSlug)!;
    }

    const schema = this.toSchemaName(tenantSlug);

    const ds = new DataSource({
      type: 'postgres',
      url: this.dbConfig.url,
      host: this.dbConfig.host,
      port: this.dbConfig.port,
      username: this.dbConfig.username,
      password: this.dbConfig.password,
      database: this.dbConfig.name,
      schema,
      // entities sẽ thêm User, RefreshToken sau khi có các entity đó
      entities: [],
      synchronize: false,
      logging: process.env.NODE_ENV !== 'production',
      extra: {
        max: 5, // giới hạn pool per-tenant, tránh quá tải DB
        ssl: this.dbConfig.sslEnabled
          ? { rejectUnauthorized: this.dbConfig.rejectUnauthorized }
          : undefined,
      },
    } as DataSourceOptions);

    await ds.initialize();
    this.pool.set(tenantSlug, ds);
    this.logger.log(`Connection established → schema: ${schema}`);

    return ds;
  }

  // Gọi khi admin tạo tenant mới
  // Tạo schema + chạy migration cho schema đó
  async provisionSchema(tenantSlug: string): Promise<void> {
    const schema = this.toSchemaName(tenantSlug);

    // CREATE SCHEMA không hỗ trợ parameterized query
    // → phải sanitize slug trước (đã làm trong toSchemaName)
    await this.publicDs.query(
      `CREATE SCHEMA IF NOT EXISTS "${schema}"`,
    );

    const ds = await this.getConnection(tenantSlug);
    await ds.runMigrations();

    this.logger.log(`Schema provisioned: ${schema}`);
  }

  // "company-abc" → "tenant_company_abc"
  // Sanitize để tránh SQL injection qua schema name
  toSchemaName(slug: string): string {
    const sanitized = slug.toLowerCase().replace(/[^a-z0-9_]/g, '_');
    if (!sanitized) throw new Error(`Invalid tenant slug: "${slug}"`);
    return `tenant_${sanitized}`;
  }

  // Đóng tất cả connections khi app shutdown
  async onApplicationShutdown(): Promise<void> {
    await Promise.all([...this.pool.values()].map((ds) => ds.destroy()));
    this.logger.log('All tenant connections closed');
  }
}