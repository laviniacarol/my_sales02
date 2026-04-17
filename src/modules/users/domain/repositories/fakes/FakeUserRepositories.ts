import { User } from "@modules/users/database/entities/User";
import { ICreateUser } from "../../models/ICreateUser";
import { IUsersRepository } from "../IUsersRepositories";

export default class FakeUserRepositories implements IUsersRepository {
  private users: User[] = [];
  private currentId = 1;

  public create({ name, email, password }: ICreateUser): User {
    const user = new User();

    user.id = this.currentId++;
    user.name = name;
    user.email = email;
    user.password = password;

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(u => u.id === user.id);

    if (findIndex >= 0) {
      this.users[findIndex] = user;
    }

    return user;
  }

  public async find(): Promise<User[]> {
    return this.users;
  }

  public async findByName(name: string): Promise<User | undefined> {
    return this.users.find(user => user.name === name);
  }

  public async findById(id: number): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }
}
