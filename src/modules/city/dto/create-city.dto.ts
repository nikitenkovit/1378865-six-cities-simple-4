import { CityType } from 'types';
import { IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { Location } from './location.dto.js';

export default class CreateCityDto {
  @IsEnum(CityType)
  public name!: CityType;

  @Type(() => Location)
  public coordinates!: Location;
}
