import typegoose, { defaultClasses, getModelForClass, Ref } from '@typegoose/typegoose';
import { Coordinates } from '../../types/coordinates.type.js';
import { GoodsType } from '../../types/goods.type.js';
import { OfferType } from '../../types/offer.enum.js';
import { UserEntity } from '../user/user.entity.js';
import { CityEntity } from '../city/city.entity.js';

const { prop, modelOptions } = typegoose;

export interface OfferEntity extends defaultClasses.Base {}
@modelOptions({
  schemaOptions: {
    collection: 'offers',
  },
})
export class OfferEntity extends defaultClasses.TimeStamps {
  // TODO перенести всю валидацию в ДТО
  @prop({
    required: true,
    trim: true,
    // minlength: [10, 'Min length for title is 10'],
    // maxlength: [100, 'Max length for title is 100'],
  })
  public title!: string;

  @prop({
    required: true,
    trim: true,
    // minlength: [20, 'Min length for description is 20'],
    // maxlength: [1024, 'Max length for description is 1024'],
  })
  public description!: string;

  @prop({
    ref: CityEntity,
    required: true,
  })
  public city!: Ref<CityEntity>;

  @prop({
    required: true,
  })
  public previewImage!: string;

  @prop({
    required: true,
  })
  public images!: string[];

  @prop({
    required: true,
    default: true,
  })
  public isPremium!: boolean;

  @prop({
    required: true,
    min: [1, 'Min rating is 1'],
    max: [5, 'Max rating is 5'],
  })
  public rating!: number;

  @prop({
    required: true,
    enum: OfferType,
  })
  public type!: OfferType;

  @prop({
    required: true,
    min: [1, 'Min bedrooms is 1'],
    max: [8, 'Max bedrooms is 8'],
  })
  public bedrooms!: number;

  @prop({
    required: true,
    min: [1, 'min maxGuests is 1'],
    max: [10, 'max maxGuests is 10'],
  })
  public maxGuests!: number;

  @prop({
    required: true,
    min: [100, 'min price is 100'],
    max: [100000, 'max price is 100000'],
  })
  public price!: number;

  @prop({
    required: true,
  })
  public goods!: GoodsType[];

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId!: Ref<UserEntity>;

  @prop({
    required: false,
  })
  public commentCount!: number;

  @prop({
    required: true,
  })
  public location!: Coordinates;
}

export const OfferModel = getModelForClass(OfferEntity);
