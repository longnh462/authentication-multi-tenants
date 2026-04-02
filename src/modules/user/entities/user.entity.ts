    import { BaseEntity } from "../../../database/entities/base.entity";
import { uuidv7 } from "uuidv7";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Unique } from "typeorm";
import { CompanyEntity } from "../../company/entities/company.entity";

const TABLE_INFO = {
    name: 'user',
    primaryKey: 'pk_user_id',
    columns: {
        userId: 'user_id',
        companyId: 'company_id',
        userEmail: 'user_email',
        hashedPassword: 'hashed_password',
        phoneNumber: 'phone_number',
        firstName: 'first_name',
        lastName: 'last_name',
        firstLogin: 'first_login',
        isActive: 'is_active',
    }

}

@Unique('uq_user_email_company', ['userEmail', 'company'])
@Entity(TABLE_INFO.name)
export class UserEntity extends BaseEntity {
    @PrimaryColumn('uuid', { name: TABLE_INFO.columns.userId, type: 'uuid' })
    userId: string;

    @BeforeInsert()
    generateId() {
        if (!this.userId) this.userId = uuidv7();
    }

    @Column({ name: TABLE_INFO.columns.userEmail, nullable: false })
    userEmail: string;

    @Column({ name: TABLE_INFO.columns.hashedPassword, nullable: false })
    hashedPassword: string;

    @Column({ name: TABLE_INFO.columns.phoneNumber, nullable: false })
    phoneNumber: string;

    @Column({ name: TABLE_INFO.columns.firstName, nullable: false })
    firstName: string;

    @Column({ name: TABLE_INFO.columns.lastName, nullable: false })
    lastName: string;

    @Column({ name: TABLE_INFO.columns.firstLogin, default: true })
    firstLogin: boolean;

    @Column({ name: TABLE_INFO.columns.isActive, default: false })
    isActive: boolean;

    @ManyToOne(() => CompanyEntity, (company) => company.companyId, { nullable: false })
    @JoinColumn({ name: TABLE_INFO.columns.companyId })
    company: CompanyEntity;
}
