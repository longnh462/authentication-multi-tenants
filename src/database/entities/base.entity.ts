import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
    @CreateDateColumn({ name: 'created_at' , type: 'timestamptz'})
    createdAt: Date;

    @Column({ nullable: true, name: 'created_by' })
    createdBy: string;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @Column({ nullable: true, name: 'updated_by' })
    updatedBy: string;
}