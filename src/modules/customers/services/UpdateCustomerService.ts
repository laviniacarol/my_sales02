import AppError from "@shared/errors/AppError";
import { customerRepository } from "../infra/database/repositories/CustomerRepositories";

import { IUpdateCustomer } from "../domain/models/IUpdateCustomer";



export default class UpdateCustomerService {
  public async execute({
    id,
    name,
    email
  }: IUpdateCustomer): Promise<void> {
    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError("Customer not found", 404);
    }

    const customerExists = await customerRepository.findByEmail(email);

    if (customerExists && email !== customer.email) {
      throw new AppError("Email already in use", 400);
    }

    customer.name = name;
    customer.email = email;

    await customerRepository.save(customer);
  }
}
