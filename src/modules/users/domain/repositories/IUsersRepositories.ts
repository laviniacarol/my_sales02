

import { User } from "@modules/users/database/entities/User";
import { ICreateUser } from "../models/ICreateUser";

export interface IUsersRepository {
	find(): Promise<User[]>;
	findByName(name: string): Promise<User | undefined>;
	findById(id: number): Promise<User | undefined>;
	findByEmail(email: string): Promise<User | undefined>;
	create(data: ICreateUser): User;
	save(user: User): Promise<User>;
}
