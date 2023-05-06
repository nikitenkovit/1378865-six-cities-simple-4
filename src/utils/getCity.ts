import { CityType } from '../types/city-type.enum';

export const getCity = (data: string) => {
  const [name, latitude, longitude] = data.trim().split(',');

  return {
    name: name as CityType,
    coordinates: { latitude: Number(latitude), longitude: Number(longitude) },
  };
};
