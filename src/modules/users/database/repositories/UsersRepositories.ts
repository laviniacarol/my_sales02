import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { User } from "../entities/User";

export const usersRepositories = AppDataSource.getRepository(User).extend({
  async findByName(name: string): Promise<User | undefined> {
    return (await this.findOneBy({ name })) ?? undefined;
  },
  async findById(id: number): Promise<User | undefined> {
    return (await this.findOneBy({ id })) ?? undefined;
  },

  async findByEmail(email: string): Promise<User | undefined> {
    return (await this.findOneBy({ email })) ?? undefined;
  },
  });
