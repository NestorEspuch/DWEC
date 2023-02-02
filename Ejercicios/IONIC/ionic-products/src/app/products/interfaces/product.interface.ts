import { User } from 'src/app/auth/interfaces/user.interface';

export interface Product {
  id?: number;
  description: string;
  imageUrl: string;
  price: number;
  rating?: number;
  creator?: User;
}
