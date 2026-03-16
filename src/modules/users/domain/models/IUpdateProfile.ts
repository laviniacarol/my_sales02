export interface IUpdateProfile {
  userId: number;
  name: string;
  email: string;
  password?: string;
  oldPassword?: string;
}
