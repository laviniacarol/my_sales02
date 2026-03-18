import AppError from "@shared/errors/AppError";
import { IDeleteCustomer } from "../domain/models/IDeleteCustomer";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepositories";
import { inject, injectable } from "tsyringe";

@injectable()
export default class DeleteCustomerService {
    constructor(
      @(inject("CustomersRepository") as ParameterDecorator)
      private customerRepository: ICustomersRepository,
    ) {}

  public async execute({ id }: IDeleteCustomer): Promise<void> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError("Customer not found", 404);
    }

    await this.customerRepository.remove(customer);
  }
}
