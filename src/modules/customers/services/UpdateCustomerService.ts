import AppError from "@shared/errors/AppError";
import { IUpdateCustomer } from "../domain/models/IUpdateCustomer";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepositories";
import { inject, injectable } from "tsyringe";



@injectable()
export default class UpdateCustomerService {
    constructor(
      @(inject("CustomersRepository") as ParameterDecorator)
      private customerRepository: ICustomersRepository,
    ) {}

  public async execute({
    id,
    name,
    email
  }: IUpdateCustomer): Promise<void> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError("Customer not found", 404);
    }

    const customerExists = await this.customerRepository.findByEmail(email);

    if (customerExists && email !== customer.email) {
      throw new AppError("Email already in use", 400);
    }

    customer.name = name;
    customer.email = email;

    await this.customerRepository.save(customer);
  }
}
