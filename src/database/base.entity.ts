import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
    @CreateDateColumn()
    createdAt: Date;

    @Column({ nullable: true })
    createdBy: string | null;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ nullable: true })
    updatedBy: string | null;

    @Column({ nullable: true })
    deletedAt: Date | null;

    @Column({ nullable: true })
    deletedBy: string | null;
}