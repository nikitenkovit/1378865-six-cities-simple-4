import { User, City } from 'types';
import { generateRandomValue } from './random.js';

const LATITUDE_MINIMUM = -90;
const LATITUDE_MAXIMUM = 90;
const LONGITUDE_MINIMUM = -180;
const LONGITUDE_MAXIMUM = 180;
const COORDINATE_PRECISION = 6;

export const getStringCity = (data: City) => {
  const { name, coordinates } = data;

  return `${name},${coordinates.latitude},${coordinates.longitude}`;
};

export const getStringUser = (data: User) => {
  const { name, password, email, isPro, avatarPath } = data;

  let user = `${name},${password},${email},${isPro}`;

  if (avatarPath) {
    user += `,${avatarPath}`;
  }

  return user;
};

export const getStringLocation = () => {
  const latitude = generateRandomValue(LATITUDE_MINIMUM, LATITUDE_MAXIMUM, COORDINATE_PRECISION);
  const longitude = generateRandomValue(LONGITUDE_MINIMUM, LONGITUDE_MAXIMUM, COORDINATE_PRECISION);
  return `${latitude},${longitude}`;
};
