import AppError from "@shared/errors/AppError";
import { customerRepository } from "../infra/database/repositories/CustomerRepositories";
import { Customer } from "../infra/database/entities/Customer";
import { ICreateCustomer } from "../domain/models/ICreateUser";



export class CreateCustomerService {
  public async execute({ name, email }: ICreateCustomer): Promise<Customer> {
   const emailExists = await customerRepository.findByEmail(email);

   if (emailExists) {
     throw new AppError("Email already in use", 400);
   }

   const customer = await customerRepository.create({
     name,
     email,
   });

   await customerRepository.save(customer);

   return customer;
  }
}
