import { usersRepositories } from "../database/repositories/UsersRepositories";
import { compare } from 'bcryptjs';
import { User } from '../../users/database/entities/User';
import { sign } from "jsonwebtoken";
import { string } from "joi";

interface ISessionUser {
  email: string;
  password: string;
}

interface ISessionResponse {
  user: User;
  token: string;
}

export default class SessionUserService {
  async execute({email, password}: ISessionUser): Promise<ISessionResponse> {
    const user = await usersRepositories.findByEmail(email);

    if (!user) {
      throw new Error("Incorrect email/password combination.");
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new Error("Incorrect email/password combination.");
    }

    const token = sign({}, process.env.APP_SECRET as string, {
      subject: String(user.id),
      expiresIn: '1d',
    })

    return {
      user,
      token
    }

  }

}

