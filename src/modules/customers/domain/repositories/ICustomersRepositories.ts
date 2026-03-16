import { ICreateCustomer } from "../models/ICreateUser";
import { ICustomer } from "../models/ICustumer";

export interface Pagination {
  take: number;
  skip: number;
}

export interface ICustomersRepository {
  findByEmail(email: string): Promise<ICustomer | undefined>;
  create(data: ICreateCustomer): Promise<ICustomer>;
  save(customer: ICustomer): Promise<ICustomer>;
  remove(customer: ICustomer): Promise<void>;
  findById(id: number): Promise<ICustomer | undefined>;
  findAndCount(pagination: Pagination): Promise<[ICustomer[], number]>;
  findByName(name: string): Promise<ICustomer | null>;
}
