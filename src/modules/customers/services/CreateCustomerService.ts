import AppError from "@shared/errors/AppError";
import { customerRepository } from "../infra/database/repositories/CustomerRepositories";
import { Customer } from "../infra/database/entities/Customer";
import { ICreateCustomer } from "../domain/models/ICreateUser";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepositories";



export class CreateCustomerService {
  private customerRepository: ICustomersRepository;

  constructor(customerRepository: ICustomersRepository) {
    this.customerRepository = customerRepository;
  }

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
