import { User, OfferType, Offer, GoodsType, CityType } from 'types';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    postDate,
    cityString,
    previewImage,
    images,
    isPremium,
    rating,
    type,
    bedrooms,
    maxGuests,
    price,
    goods,
    hostString,
    locationString,
  ] = offerData.replace('\n', '').split('\t');

  const [nameName, CityLatitude, CityLongitude] = cityString.trim().split(',');
  const [name, email, password, isPro, avatarPath] = hostString.trim().split(',');
  const [locationLatitude, locationLongitude] = locationString.trim().split(',');

  const city = {
    name: nameName as CityType,
    coordinates: { latitude: Number(CityLatitude), longitude: Number(CityLongitude) },
  };

  const host: User = {
    name,
    email,
    password,
    isPro: isPro === 'true',
  };

  if (avatarPath) {
    host.avatarPath = avatarPath;
  }

  const location = { latitude: Number(locationLatitude), longitude: Number(locationLongitude) };

  return {
    title,
    description,
    postDate: new Date(postDate),
    city: city,
    previewImage: previewImage.trim(),
    images: images.split(',').map((image) => image.trim()),
    isPremium: isPremium === 'true',
    rating: Number(rating),
    type: type.trim() as OfferType,
    bedrooms: Number(bedrooms),
    maxGuests: Number(maxGuests),
    price: Number(price),
    goods: goods.split(',').map((it) => it.trim()) as GoodsType[],
    host: host,
    location: location,
  };
}
