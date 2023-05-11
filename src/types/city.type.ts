import { Coordinates } from './coordinates.type';

export type CityType = 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';

export type City = {
  name: CityType;
  coordinates: Coordinates;
};
