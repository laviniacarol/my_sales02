import UserToken from "@modules/users/database/entities/UserToken";

export interface IUserTokensRepository {
  findByToken(token: string): Promise<UserToken | undefined>;
  generate(userId: number): Promise<UserToken | undefined>;
}
