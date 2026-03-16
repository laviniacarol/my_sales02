import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { Customer } from "@modules/customers/infra/database/entities/Customer";
import { ICustomersRepository, Pagination } from "@modules/customers/domain/repositories/ICustomersRepositories";
import { ICreateCustomer } from "@modules/customers/domain/models/ICreateUser";
import { ICustomer } from "@modules/customers/domain/models/ICustumer";
import { Repository } from "typeorm/repository/Repository";


export default class customersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Customer);
  }

  async findByEmail(email: string): Promise<ICustomer | undefined> {
    const customer = await this.ormRepository.findOneBy({
      email,
    });

    return customer ?? undefined;
  }
  async create(data: ICreateCustomer): Promise<ICustomer> {
    const customer = this.ormRepository.create(data);
    await this.ormRepository.save(customer);
    return customer;

  }
  async save(customer: ICustomer): Promise<ICustomer> {
    const updatedCustomer = await this.ormRepository.save(customer);
    return updatedCustomer;
  }
  async remove(customer: ICustomer): Promise<void> {
    await this.ormRepository.remove(customer);
  }
  async findById(id: number): Promise<ICustomer | undefined> {
    const customer = await this.ormRepository.findOneBy({
      id,
    });

    return customer ?? undefined;
  }
  async findAndCount(pagination: Pagination): Promise<[ICustomer[], number]> {
    const [customers, count] = await this.ormRepository.findAndCount({
      skip: pagination.skip,
      take: pagination.take,
    });

    return [customers, count];
  }
  async findByName(name: string): Promise<ICustomer | null> {
    const customer = await this.ormRepository.findOneBy({
      name,
    });

    return customer;
  }

}

export const customerRepository = new customersRepository();
