import { UserRole } from "../enums";

export interface IUser {
  name: string;
  role: UserRole;
  id: string;
  image: string;
}

export interface IUserData {
  count: number;
  next: string | null;
  previous: string | null;
  results: IUser[];
}
