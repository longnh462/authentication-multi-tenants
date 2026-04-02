import { Injectable } from "@nestjs/common";
import { CompanyAbstractRepository } from "./company.abstract.repository";
import { CompanyEntity } from "../entities/company.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CompanyRepository implements CompanyAbstractRepository {
    constructor(
        @InjectRepository(CompanyEntity)
        private readonly companyRepository: Repository<CompanyEntity>
    ) { }

    create(entity: CompanyEntity): Promise<CompanyEntity> {
        return this.companyRepository.save(entity);
    }

}