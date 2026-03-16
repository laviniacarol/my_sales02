import AppError from "@shared/errors/AppError";
import { Customer } from "../infra/database/entities/Customer";
import { IShowCustomer } from "../domain/models/IShowCustomer";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepositories";

export default class ShowCustomerService {
    constructor(private customerRepository: ICustomersRepository) {}

  public async execute({ id}: IShowCustomer): Promise<Customer> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError("Customer not found", 404);
    }

    return customer;
  }

}
