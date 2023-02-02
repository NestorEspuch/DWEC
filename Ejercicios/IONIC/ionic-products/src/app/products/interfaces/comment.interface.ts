import { User } from '../../auth/interfaces/user.interface';

export interface Comment {
  id?: number;
  text: string;
  date?: string;
  user?: User;
}
