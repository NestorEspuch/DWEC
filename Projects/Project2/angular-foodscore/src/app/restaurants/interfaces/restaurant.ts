import { User } from "src/app/users/interfaces/user";

export interface Restaurant {
  id?: number,
  name: string,
  image: string,
  cuisine: string,
  description: string,
  phone: string,
  daysOpen: string[]
  creator?: User;
  stars?: number;
  mine?: boolean;
  distance?: number;
  commented?: boolean;
  address?: string;
  lat: number;
  lng: number;
}
