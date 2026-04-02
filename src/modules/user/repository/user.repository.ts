import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAbstractRepository } from './user.abstract.repository';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository implements UserAbstractRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    create(entity: UserEntity): Promise<UserEntity> {
        return this.userRepository.save(entity);
    }

    findAll(): Promise<UserEntity[]> {
        return this.userRepository.find({ relations: ['company'] });
    }

    findOne(userId: string): Promise<UserEntity | null> {
        return this.userRepository.findOne({ where: { userId }, relations: ['company'] });
    }
}
