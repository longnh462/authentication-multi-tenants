import { BaseEntity } from "../../../database/entities/base.entity";
import { uuidv7 } from "uuidv7";
import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";

const TABLE_INFO = {
    name: 'company',
    primaryKey: 'pk_company_id',
    columns: {
        companyId: 'company_id',
        companyCode: 'company_code',
        companyName: 'company_name',
        companyEmail: 'company_email',
        address: 'address',
        phoneNumber: 'phone_number',
        isActive: 'is_active',
    }

}

@Entity(TABLE_INFO.name)
export class Company extends BaseEntity {
    @PrimaryColumn('uuid', { name: TABLE_INFO.columns.companyId, type: 'uuid' })
    companyId: string;

    @BeforeInsert()
    generateId() {
        if (!this.companyId) this.companyId = uuidv7();
    }

    @Column({ name: TABLE_INFO.columns.companyCode, unique: true, nullable: false })
    companyCode: string;

    @Column({ name: TABLE_INFO.columns.companyName, nullable: false })
    companyName: string;

    @Column({ name: TABLE_INFO.columns.companyEmail, nullable: false })
    companyEmail: string;

    @Column({ name: TABLE_INFO.columns.address, nullable: false })
    address: string;

    @Column({ name: TABLE_INFO.columns.phoneNumber, nullable: false })
    phoneNumber: string;

    @Column({ name: TABLE_INFO.columns.isActive, default: false })
    isActive: boolean;
}
