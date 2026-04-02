import { UserEntity } from '../entities/user.entity';

export abstract class UserAbstractRepository {
    abstract create(entity: UserEntity): Promise<UserEntity>;
    abstract findAll(): Promise<UserEntity[]>;
    abstract findOne(userId: string): Promise<UserEntity | null>;
}
