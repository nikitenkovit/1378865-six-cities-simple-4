import dayjs from 'dayjs';
import { OfferGeneratorInterface } from './offer-generator.interface.js';
import {
  generateRandomValue,
  getFixedNumberRandomItems,
  getRandomItem,
  getStringCity,
  getStringLocation,
  getStringUser,
} from '../helpers/index.js';
import { User, GoodsType, OfferType, City, MockData } from 'types';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;
const NUMBER_OF_IMAGES = 6;
const RATING_MINIMUM = 1;
const RATING_MAXIMUM = 5;
const RATING_PRECISION = 1;
const BEDROOMS_MINIMUM = 1;
const BEDROOMS_MAXIMUM = 8;
const MIN_GUESTS = 1;
const MAX_GUESTS = 10;
const MIN_PRICE = 100;
const MAX_PRICE = 100000;
const PRICE_PRECISION = 2;
const GOODS_MINIMUM = 1;

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const images = getFixedNumberRandomItems<string>(NUMBER_OF_IMAGES, this.mockData.images).join(
      ',',
    );
    const goods = getFixedNumberRandomItems<GoodsType>(
      generateRandomValue(GOODS_MINIMUM, this.mockData.goods?.length),
      this.mockData.goods,
    ).join(',');
    const title = getRandomItem<string>(this.mockData.title);
    const description = getRandomItem<string>(this.mockData.description);
    const postDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const city = getStringCity(getRandomItem<City>(this.mockData.city));
    const previewImage = getRandomItem<string>(this.mockData.previewImage);
    const isPremium = getRandomItem<boolean>(this.mockData.isPremium);
    const rating = generateRandomValue(RATING_MINIMUM, RATING_MAXIMUM, RATING_PRECISION);
    const type = getRandomItem<OfferType>(this.mockData.type);
    const bedrooms = generateRandomValue(BEDROOMS_MINIMUM, BEDROOMS_MAXIMUM);
    const maxGuests = generateRandomValue(MIN_GUESTS, MAX_GUESTS);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE, PRICE_PRECISION);
    const host = getStringUser(getRandomItem<User>(this.mockData.host));
    const location = getStringLocation();

    return [
      title,
      description,
      postDate,
      city,
      previewImage,
      images,
      isPremium,
      rating,
      type,
      bedrooms,
      maxGuests,
      price,
      goods,
      host,
      location,
    ].join('\t');
  }
}
