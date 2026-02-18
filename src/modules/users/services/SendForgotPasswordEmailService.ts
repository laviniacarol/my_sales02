import { usersRepositories } from "../database/repositories/UsersRepositories";
import AppError from "@shared/errors/AppError";
import { userTokenRepositories } from "../database/repositories/UserTokensRepositories";

interface IForgotPassword {
  email: string;
}

export default class SendForgotPasswordEmailService {
  async execute(email: string): Promise<void> {
    const user = await usersRepositories.findByEmail(email);

    if (!user) {
      throw new AppError("User does not exist", 404);
    }

    const token = await userTokenRepositories.generate(user.id);
    console.log(token)
  }
}
