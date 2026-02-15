import { usersRepositories } from "../database/repositories/UsersRepositories";
import { compare } from "bcryptjs";
import { User } from "../../users/database/entities/User";
import { Secret, sign } from "jsonwebtoken";
import AppError from "@shared/errors/AppError";

interface ISessionUser {
  email: string;
  password: string;
}

interface ISessionResponse {
  user: User;
  token: string;
}

export default class SessionUserService {
  async execute({ email, password }: ISessionUser): Promise<ISessionResponse> {
    const user = await usersRepositories.findByEmail(email);

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
