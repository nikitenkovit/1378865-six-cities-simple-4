import { Expose } from 'class-transformer';
import { CityType } from '../../../types/city.type.js';
import { Coordinates } from '../../../types/coordinates.type.js';

export default class CityRdo {
  @Expose()
  public id!: string;

  @Expose()
  public name!: CityType;

  @Expose()
  public coordinates!: Coordinates;
}
