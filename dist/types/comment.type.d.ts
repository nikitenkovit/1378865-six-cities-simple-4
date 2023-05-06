import { User } from './user.type';
export type Comment = {
    price: string;
    date: Date;
    rating: number;
    user: User;
};
