import { CreateCompanyDto } from "../dto/create-company.dto";
import { CompanyEntity } from "../entities/company.entity";

export class CompanyMapper {
    static toEntity(createCompanyDto: CreateCompanyDto): CompanyEntity {
        const companyEntity = new CompanyEntity();
        companyEntity.companyCode = createCompanyDto.companyCode;
        companyEntity.companyName = createCompanyDto.companyName;
        companyEntity.companyEmail = createCompanyDto.companyEmail;
        companyEntity.address = createCompanyDto.address;
        companyEntity.phoneNumber = createCompanyDto.phoneNumber;
        return companyEntity;
    }
}