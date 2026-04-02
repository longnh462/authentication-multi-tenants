import { BaseEntity } from "../../../database/entities/base.entity";
import { uuidv7 } from "uuidv7";
import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";

const TABLE_INFO = {
    name: 'user',
    primaryKey: 'pk_user_id',
    columns: {
        userId: 'user_id',
        userName: 'user_name',
        userEmail: 'user_email',
        companyId: 'company_id',
        phoneNumber: 'phone_number',
        isActive: 'is_active',
    }

}

@Entity(TABLE_INFO.name)
export class User extends BaseEntity {
    @PrimaryColumn('uuid', { name: TABLE_INFO.columns.userId, type: 'uuid' })
    userId: string;

    @BeforeInsert()
    generateId() {
        if (!this.userId) this.userId = uuidv7();
    }
}
