import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tenants', { schema: 'public' })
export class TenantEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // slug dùng để map sang schema name: "company-abc" → "tenant_company_abc"
  @Column({ unique: true, length: 63 })
  slug: string;

  @Column({ length: 255 })
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
