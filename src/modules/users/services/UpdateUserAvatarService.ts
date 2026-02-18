import uploadConfig from "@config/upload";
import { User } from "../database/entities/User";
import { usersRepositories } from "../database/repositories/UsersRepositories";
import AppError from "@shared/errors/AppError";
import path from "path/win32";
import fs from "fs";

interface IUpdateUserAvatar {
  userId: number;
  avatarFilename: string;
}


export default class UpdateUserAvatarService {
  async execute({ userId, avatarFilename }: IUpdateUserAvatar): Promise<User> {
    const user = await usersRepositories.findById(Number(userId));

    if (!user) {
      throw new AppError("User not found.", 404);
    }

    if(user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);


      if(userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepositories.save(user);

    return user;
  }}
