import UserToken from "../entities/UserToken";
import { AppDataSource } from "@shared/infra/typeorm/data-source";

export const userTokenRepositories = AppDataSource.getRepository(
  UserToken,
).extend({
  async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.findOne({ where: { token } });
    return userToken ?? undefined;
  },
  async generate(userId: number): Promise<UserToken | undefined> {
    const userToken = this.create({ userId });
    await this.save(userToken);
    return userToken;
  }
})
