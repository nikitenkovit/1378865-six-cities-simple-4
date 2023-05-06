import { Coordinates } from './coordinates.type';
import { CityType } from './city-type.enum';

export type City = {
  name: CityType;
  coordinates: Coordinates;
};
