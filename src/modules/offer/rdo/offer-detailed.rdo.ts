import { Expose, Type } from 'class-transformer';
import { Coordinates } from '../../../types/coordinates.type.js';
import { GoodsType } from '../../../types/goods.type.js';
import { OfferType } from '../../../types/offer.enum.js';
import UserRdo from '../../user/rdo/user.rdo.js';
import CityRdo from '../../city/rdo/city.rdo.js';

export default class OfferDetailedRdo {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public createdAt!: string;

  @Expose()
  @Type(() => CityRdo)
  public city!: CityRdo;

  @Expose()
  public previewImage!: string;

  @Expose()
  public images!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public type!: OfferType;

  @Expose()
  public bedrooms!: number;

  @Expose()
  public maxGuests!: number;

  @Expose()
  public price!: number;

  @Expose()
  public goods!: GoodsType[];

  @Expose({ name: 'userId' })
  @Type(() => UserRdo)
  public host!: UserRdo;

  @Expose()
  public location!: Coordinates;

  @Expose()
  public rating!: number;

  @Expose()
  public commentCount!: number;

}
