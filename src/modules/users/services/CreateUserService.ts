import { User } from "../database/entities/User";
import AppError from "@shared/errors/AppError";
import { usersRepositories } from "../database/repositories/UsersRepositories";
import { hash } from "bcrypt";
import { ICreateUser } from "../domain/models/ICreateUser";
import { IUsersRepository } from "../domain/repositories/IUsersRepositories";

export default class CreateUserService {
  constructor(private usersRepository: IUsersRepository = usersRepositories) {}

  async execute({ name, email, password }: ICreateUser): Promise<User> {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError("Email address already used.", 400);
    }

    const hashPassword = await hash(password, 10);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashPassword,
    });

    await this.usersRepository.save(user);

    return user;
  }
}
