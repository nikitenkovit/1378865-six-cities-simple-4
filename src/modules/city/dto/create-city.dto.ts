import { CityType, Coordinates } from 'types';

export default class CreateCityDto {
  // TODO валидация
  public name!: CityType;
  public coordinates!: Coordinates;
}
