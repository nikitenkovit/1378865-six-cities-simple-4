import { Expose, Type } from 'class-transformer';
import CityRdo from '../../city/rdo/city.rdo.js';

export default class OfferShortRdo {
  @Expose()
  public title!: string;

  @Expose()
  public type!: number;

  @Expose()
  public createdAt!: string;

  @Expose({ name: 'cityId' })
  @Type(() => CityRdo)
  public city!: CityRdo;

  @Expose()
  public price!: number;

  @Expose()
  public previewImage!: string;

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public commentCount!: number;
}
