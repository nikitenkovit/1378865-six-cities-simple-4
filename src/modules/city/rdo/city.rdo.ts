import { Expose } from 'class-transformer';
import { CityType, Coordinates } from 'types';

export default class CityRdo {
  @Expose()
  public name!: CityType;

  @Expose()
  public coordinates!: Coordinates;
}
