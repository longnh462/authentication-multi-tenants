import { UserEntity } from 'src/modules/user/entities/user.entity';
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

@Entity({
    name: 'session',
})
export class SessionEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserEntity)
    @Index()
    user: UserEntity;

    @Column()
    hash: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
