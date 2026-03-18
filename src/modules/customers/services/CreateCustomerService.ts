import AppError from "@shared/errors/AppError";
import { Customer } from "../infra/database/entities/Customer";
import { ICreateCustomer } from "../domain/models/ICreateUser";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepositories";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateCustomerService {
  constructor(
    @(inject("CustomersRepository") as ParameterDecorator)
    private customerRepository: ICustomersRepository,
  ) {}

  public async execute({ name, email }: ICreateCustomer): Promise<Customer> {
   const emailExists = await this.customerRepository.findByEmail(email);

   if (emailExists) {
     throw new AppError("Email already in use", 400);
   }

   const customer = await this.customerRepository.create({
     name,
     email,
   });

   await this.customerRepository.save(customer);

   return customer;
  }
}

export default CreateCustomerService;

