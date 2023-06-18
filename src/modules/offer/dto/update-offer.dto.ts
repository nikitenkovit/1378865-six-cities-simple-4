import { GoodsType } from '../../../types/goods.type.js';
import { OfferType } from '../../../types/offer.enum.js';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsMongoId,
  Max,
  MaxLength,
  Min,
  MinLength,
  IsOptional,
  ValidateNested,
  IsString,
  IsNumber,
} from 'class-validator';
import { Location } from './location.dto.js';
import { Type } from 'class-transformer';
import { RATING_PRECISION } from '../../../constants/rating.js';

export default class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, { message: 'Minimum title length must be 10' })
  @MaxLength(100, { message: 'Maximum title length must be 100' })
  public title?: string;

  @IsOptional()
  @MinLength(20, { message: 'Minimum description length must be 20' })
  @MaxLength(1024, { message: 'Maximum description length must be 1024' })
  public description?: string;

  @IsOptional()
  @IsMongoId({ message: 'city field must be valid an id' })
  public cityId?: string;

  @IsOptional()
  @IsString()
  public previewImage?: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(6)
  @ArrayMaxSize(6)
  public images?: [string, string, string, string, string, string];

  @IsOptional()
  @IsBoolean({ message: 'Field isPremium must be an boolean' })
  public isPremium?: boolean;

  @IsOptional()
  @IsEnum(OfferType, {
    each: true,
    message: 'Field type must be apartment, or room, or house, or hotel',
  })
  public type?: OfferType;

  @IsOptional()
  @IsInt({ message: 'Field bedrooms must be an integer' })
  @Min(1, { message: 'Minimum bedrooms is 1' })
  @Max(8, { message: 'Maximum bedrooms is 8' })
  public bedrooms?: number;

  @IsOptional()
  @IsInt({ message: 'Field maxGuests must be an integer' })
  @Min(1, { message: 'Minimum maxGuests is 1' })
  @Max(10, { message: 'Maximum maxGuests is 10' })
  public maxGuests?: number;

  @IsOptional()
  @IsInt({ message: 'Field price must be an integer' })
  @Min(100, { message: 'Minimum price is 100' })
  @Max(100000, { message: 'Maximum price is 100000' })
  public price?: number;

  @IsOptional()
  @IsArray({ message: 'Field comfort must be an array' })
  @IsEnum(GoodsType, {
    each: true,
    message:
      'Field goods must be Breakfast, or Air conditioning, or Laptop friendly workspace, or Baby seat, or Washer, or Towels, or Fridge',
  })
  @ArrayUnique({ message: 'Field goods must be contain unique item' })
  public goods?: GoodsType[];

  @IsOptional()
  @ValidateNested({ message: 'This is not a "Location" type object!' })
  @Type(() => Location)
  public location?: Location;

  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: RATING_PRECISION },
    { message: `Допускается максимум ${RATING_PRECISION} числел после запятой` },
  )
  @Min(1, { message: 'Minimum rating is 1' })
  @Max(5, { message: 'Maximum rating is 5' })
  public rating?: number;
}
