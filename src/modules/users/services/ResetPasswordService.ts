import { hash } from "bcrypt";
import { userTokenRepositories } from "../database/repositories/UserTokensRepositories";
import { usersRepositories } from "../database/repositories/UsersRepositories";
import { isAfter, addHours } from "date-fns";
import AppError from "@shared/errors/AppError";
import { IResetPassword } from "../domain/models/IResetPassword";
import { IUsersRepository } from "../domain/repositories/IUsersRepositories";
import { IUserTokensRepository } from "../domain/repositories/IUserTokensRepositories";


export default class ResetPasswordService {
 constructor(
  private usersRepository: IUsersRepository = usersRepositories,
  private userTokensRepository: IUserTokensRepository = userTokenRepositories,
 ) {}

 async execute({ token, password }: IResetPassword): Promise<void> {
  const userToken = await this.userTokensRepository.findByToken(token);

  if (!userToken) {
    throw new AppError("User token does not exist", 400);
  }

  const user = await this.usersRepository.findById(userToken.userId);

  if(!user) {
    throw new AppError("User does not exist", 404);
  }

  const tokenCreatedAt = userToken.created_at;
  const compareDate = addHours(tokenCreatedAt, 2);

  if (isAfter(Date.now(), compareDate)) {
    throw new AppError("Token expired", 400);
  }

  user.password = await hash(password, 8);

  await this.usersRepository.save(user);

}
}
