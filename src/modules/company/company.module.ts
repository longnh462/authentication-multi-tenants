import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { CompanyAbstractRepository } from './repository/company.abstract.repository';
import { CompanyRepository } from './repository/company.repository';
import { CompanyEntity } from './entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity])],
  controllers: [CompanyController],
  providers: [CompanyService,
    {
      provide: CompanyAbstractRepository,
      useClass: CompanyRepository
    }
  ],
})
export class CompanyModule { }
