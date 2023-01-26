import { User } from "src/app/users/interfaces/user";

export interface Commentary {
  id?: number;
  stars: number;
  text: string;
  date?: string;
  user?: User;
}
