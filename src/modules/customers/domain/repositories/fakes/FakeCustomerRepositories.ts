import { Customer } from "@modules/customers/infra/database/entities/Customer";
import { ICreateCustomer } from "../../models/ICreateUser";
import { ICustomer } from "../../models/ICustumer";
import { ICustomersRepository, Pagination } from "../ICustomersRepositories";

export default class FakeCustomerRepository implements ICustomersRepository {
  private customers: ICustomer[] = [];
  private currentId = 1;

  public create({ name, email }: ICreateCustomer): ICustomer {
    const customer = new Customer();
    const now = new Date();

    customer.id = this.currentId++;
    customer.name = name;
    customer.email = email;
    customer.created_at = now;
    customer.updated_at = now;

    this.customers.push(customer);

    return customer;
  }

  public async save(customer: ICustomer): Promise<ICustomer> {
    const findIndex = this.customers.findIndex(
      findCustomer => findCustomer.id === customer.id,
    );

    if (findIndex >= 0) {
      customer.updated_at = new Date();
      this.customers[findIndex] = customer;
    }

    return customer;
  }

  public async remove(customer: ICustomer): Promise<ICustomer> {
    const findIndex = this.customers.findIndex(
      findCustomer => findCustomer.id === customer.id,
    );

    if (findIndex >= 0) {
      this.customers.splice(findIndex, 1);
    }

    return customer;
  }

  public async findById(id: number): Promise<ICustomer | undefined> {
    return this.customers.find(customer => customer.id === id);
  }

  public async findAndCount(
    pagination: Pagination,
  ): Promise<[ICustomer[], number]> {
    const { skip, take } = pagination;
    const data = this.customers.slice(skip, skip + take);
    return [data, this.customers.length];
  }

  public async findByName(name: string): Promise<ICustomer | undefined> {
    return this.customers.find(customer => customer.name === name);
  }

  public async findByEmail(email: string): Promise<ICustomer | undefined> {
    return this.customers.find(customer => customer.email === email);
  }
}
