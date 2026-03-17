import { compare, hash } from 'bcrypt';
import { User } from '../database/entities/User';
import { usersRepositories } from '../database/repositories/UsersRepositories';
import AppError from '@shared/errors/AppError';
import { IUpdateProfile } from '../domain/models/IUpdateProfile';
import { IUsersRepository } from '../domain/repositories/IUsersRepositories';

export default class UpdateProfileService {
  constructor(private usersRepository: IUsersRepository = usersRepositories) {}

  async execute({
    userId,
    name,
    email,
    password,
    oldPassword,
  }: IUpdateProfile): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if(!user) {
      throw new AppError("User not found", 404);
    }

    if(email) {
        const userUpdateEmail = await this.usersRepository.findByEmail(email);

        if(userUpdateEmail) {
          throw new AppError("Email already in use", 400);
        }

        user.email = email;
    }

    if(password && !oldPassword) {
      throw new AppError("Old password is required to set a new password", 400);
    }

    if(password && oldPassword) {
      const checkOldPassword = await compare(oldPassword, user.password);

      if(!checkOldPassword) {
        throw new AppError("Old password does not match", 400);
      }

      user.password = await hash(password, 10)
    }

    if (name) {
      user.name = name;
    }

    await this.usersRepository.save(user);

    return user;
  }
}
