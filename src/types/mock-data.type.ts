import { City } from './city.type';
import { GoodsType } from './goods.type';
import { OfferType } from './offer.type';
import { User } from './user.type';

export type MockData = {
  title: string[];
  description: string[];
  postDate: string[];
  city: City[];
  previewImage: string[];
  images: string[];
  isPremium: boolean[];
  type: OfferType[];
  goods: GoodsType[];
  host: User[];
};
