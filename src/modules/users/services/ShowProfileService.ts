import { User } from "../database/entities/User";
import { usersRepositories } from "../database/repositories/UsersRepositories";
import AppError from "@shared/errors/AppError";

interface IShowProfile {
  userId: number;
}

export default class ShowProfileService {
 async execute({ userId }: IShowProfile): Promise<User> {
  const user = await usersRepositories.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
}
}
