import { CompanyEntity } from "../entities/company.entity";

export abstract class CompanyAbstractRepository {
  abstract create(entity: CompanyEntity): Promise<CompanyEntity>;
}