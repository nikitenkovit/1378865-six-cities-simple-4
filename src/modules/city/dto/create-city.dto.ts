import { CityType, Coordinates } from 'types';

export default class CreateCityDto {
  public name!: CityType;
  public coordinates!: Coordinates;
}
