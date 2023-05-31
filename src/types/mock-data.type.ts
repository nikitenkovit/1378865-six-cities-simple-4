import { GoodsType } from './goods.type';
import { OfferType } from './offer.enum';
import { User } from './user.type';

export type MockData = {
  title: string[];
  description: string[];
  city: string[];
  previewImage: string[];
  images: string[];
  isPremium: boolean[];
  type: OfferType[];
  goods: GoodsType[];
  host: User[];
};
