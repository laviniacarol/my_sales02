import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepositories';
import { customerRepository } from '@modules/customers/infra/database/repositories/CustomerRepositories';
import { container } from 'tsyringe';

container.registerInstance<ICustomersRepository>(
  'CustomersRepository',
  customerRepository
)
