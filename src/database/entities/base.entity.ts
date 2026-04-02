import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
    @CreateDateColumn({ name: 'created_at' , type: 'timestamptz'})
    createdAt: Date;

    @Column({ nullable: true, name: 'created_by' })
    createdBy: string | null;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @Column({ nullable: true, name: 'updated_by' })
    updatedBy: string | null;

    @Column({ nullable: true, name: 'deleted_at', type: 'timestamptz' })
    deletedAt: Date | null;

    @Column({ nullable: true, name: 'deleted_by' })
    deletedBy: string | null;
}