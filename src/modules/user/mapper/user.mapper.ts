import { CompanyEntity } from '../../company/entities/company.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

export class UserMapper {
    static toEntity(dto: CreateUserDto): UserEntity {
        const user = new UserEntity();
        user.userEmail = dto.userEmail;
        user.hashedPassword = dto.hashedPassword;
        user.phoneNumber = dto.phoneNumber;
        user.firstName = dto.firstName;
        user.lastName = dto.lastName;

        const company = new CompanyEntity();
        company.companyId = dto.companyId;
        user.company = company;

        return user;
    }

    static toPartialEntity(dto: UpdateUserDto): Partial<UserEntity> {
        const entity: Partial<UserEntity> = {};
        if (dto.userEmail !== undefined) entity.userEmail = dto.userEmail;
        if (dto.hashedPassword !== undefined) entity.hashedPassword = dto.hashedPassword;
        if (dto.phoneNumber !== undefined) entity.phoneNumber = dto.phoneNumber;
        if (dto.firstName !== undefined) entity.firstName = dto.firstName;
        if (dto.lastName !== undefined) entity.lastName = dto.lastName;
        return entity;
    }
}
