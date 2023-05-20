import { City, Coordinates, GoodsType, OfferType } from 'types';

export default class CreateOfferDto {
  public title!: string;
  public description!: string;
  public postDate!: Date;
  public city!: City;
  public previewImage!: string;
  public images!: string[];
  public isPremium!: boolean;
  public rating!: number;
  public type!: OfferType;
  public bedrooms!: number;
  public maxGuests!: number;
  public price!: number;
  public goods!: GoodsType[];
  public userId!: string;
  public commentsLength?: number;
  public location!: Coordinates;
}
