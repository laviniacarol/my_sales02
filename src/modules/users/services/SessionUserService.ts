import { usersRepositories } from "../database/repositories/UsersRepositories";
import { compare } from "bcryptjs";
import { Secret, sign } from "jsonwebtoken";
import { ISessionResponse } from "../domain/models/ISessionResponse";
import AppError from "@shared/errors/AppError";
import { ISessionUser } from "../domain/models/ISessionUser";
import { IUsersRepository } from "../domain/repositories/IUsersRepositories";


export default class SessionUserService {
  constructor(private usersRepository: IUsersRepository = usersRepositories) {}

  async execute({ email, password }: ISessionUser): Promise<ISessionResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    const token = sign({}, process.env.APP_SECRET as Secret, {
      subject: String(user.id),
      expiresIn: "1d",
    });

    return {
      user,
      token,
    };
  }
}
