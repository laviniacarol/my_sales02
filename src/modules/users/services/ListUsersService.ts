import { User } from '../database/entities/User';
import { usersRepositories } from '../database/repositories/UsersRepositories';
import { IUsersRepository } from '../domain/repositories/IUsersRepositories';

export default class ListUsersService {
  constructor(private usersRepository: IUsersRepository = usersRepositories) {}

  async execute(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return users;
  }
}
