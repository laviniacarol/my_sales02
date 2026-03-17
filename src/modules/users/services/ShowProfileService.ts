import { User } from "../database/entities/User";
import { usersRepositories } from "../database/repositories/UsersRepositories";
import AppError from "@shared/errors/AppError";
import { IShowProfile } from "../domain/models/IShowProfile";
import { IUsersRepository } from "../domain/repositories/IUsersRepositories";

export default class ShowProfileService {
 constructor(private usersRepository: IUsersRepository = usersRepositories) {}

 async execute({ userId }: IShowProfile): Promise<User> {
  const user = await this.usersRepository.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
}
}
