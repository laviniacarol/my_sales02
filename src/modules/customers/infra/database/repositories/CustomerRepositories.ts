import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { Customer } from "@modules/customers/infra/database/entities/Customer";

export const customerRepository = AppDataSource.getRepository(Customer).extend({
  async findByName(name: string): Promise<Customer | undefined> {
    return (await this.findOneBy({ name })) ?? undefined;
  },

  async findById(id: number): Promise<Customer | undefined> {
    return (await this.findOneBy({ id })) ?? undefined;
  },

  async findByEmail(email: string): Promise<Customer | undefined> {
    return (await this.findOneBy({ email })) ?? undefined;
  },
});
