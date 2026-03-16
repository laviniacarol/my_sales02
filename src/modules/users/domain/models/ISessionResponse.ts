import { User } from "@modules/users/database/entities/User";

export interface ISessionResponse {
  user: User;
  token: string;
}
