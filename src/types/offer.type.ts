import { City } from './city.type';
import { GoodsType } from './goods.type';
import { User } from './user.type';
import { Coordinates } from './coordinates.type';
import { OfferType } from './offer.enum';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  rating: number;
  type: OfferType;
  bedrooms: number;
  maxGuests: number;
  price: number;
  goods: GoodsType[];
  host: User;
  commentsLength?: number;
  location: Coordinates;
};
