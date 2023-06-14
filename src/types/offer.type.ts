import { GoodsType } from './goods.type';
import { User } from './user.type';
import { Coordinates } from './coordinates.type';
import { OfferType } from './offer.enum';

export type Offer = {
  title: string;
  description: string;
  city: string;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  rating?: number;
  type: OfferType;
  bedrooms: number;
  maxGuests: number;
  price: number;
  goods: GoodsType[];
  host: User;
  commentCount?: number;
  location: Coordinates;
};
