import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyAbstractRepository } from './repository/company.abstract.repository';
import { CompanyMapper } from './mapper/company.mapper';

@Injectable()
export class CompanyService {

  constructor(private readonly companyRepository: CompanyAbstractRepository,
  ) { }

  create(createCompanyDto: CreateCompanyDto) {
    const entity = CompanyMapper.toEntity(createCompanyDto);
    return this.companyRepository.create(entity);
  }
}
