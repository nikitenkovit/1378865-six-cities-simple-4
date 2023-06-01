import { City, Coordinates, GoodsType, OfferType } from 'types';

export default class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public city?: City;
  public previewImage?: string;
  public images?: string[];
  public isPremium?: boolean;
  public rating?: number;
  public type?: OfferType;
  public bedrooms?: number;
  public maxGuests?: number;
  public price?: number;
  public goods?: GoodsType[];
  public location?: Coordinates;
}
