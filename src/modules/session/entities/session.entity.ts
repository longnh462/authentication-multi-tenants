import { UserEntity } from './../../user/entities/user.entity';
import { CompanyEntity } from './../../company/entities/company.entity';
import {
    CreateDateColumn,
    Entity,
    Index,
    ManyToOne,
    PrimaryGeneratedColumn,
    DeleteDateColumn,
    Column,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'session' })
export class SessionEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    hash: string;

    @ManyToOne(() => UserEntity, { nullable: false, onDelete: 'CASCADE' })
    @Index()
    user: UserEntity;

    @ManyToOne(() => CompanyEntity, { nullable: false, onDelete: 'CASCADE' })
    @Index()
    company: CompanyEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
