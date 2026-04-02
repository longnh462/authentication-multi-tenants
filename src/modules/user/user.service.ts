import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserAbstractRepository } from './repository/user.abstract.repository';
import { UserMapper } from './mapper/user.mapper';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserAbstractRepository) {}

  create(createUserDto: CreateUserDto) {
    const entity = UserMapper.toEntity(createUserDto);
    return this.userRepository.create(entity);
  }

  findAll() {
    return this.userRepository.findAll();
  }

  async findOne(userId: string) {
    const user = await this.userRepository.findOne(userId);
    if (!user) throw new NotFoundException(`User ${userId} not found`);
    return user;
  }
}

