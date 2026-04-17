import UserToken from "@modules/users/database/entities/UserToken";
import { IUserTokensRepository } from "../IUserTokensRepositories";
import { v4 as uuidv4 } from "uuid";

export default class FakeUserTokensRepositories
  implements IUserTokensRepository
{
  private userTokens: UserToken[] = [];
  private currentId = 1;

  public async generate(userId: number): Promise<UserToken> {
    const userToken = new UserToken();

    userToken.id = this.currentId++;
    userToken.token = uuidv4();
    userToken.userId = userId;
    userToken.created_at = new Date();
    userToken.updated_at = new Date();

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    return this.userTokens.find(t => t.token === token);
  }

  public async findAll(): Promise<UserToken[]> {
    return this.userTokens;
  }
}
