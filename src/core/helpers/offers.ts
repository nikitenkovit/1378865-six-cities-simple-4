import { User, OfferType, Offer, GoodsType, CityType } from 'types';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
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

  const [name, password, email, isPro, avatarPath] = hostString.trim().split(',');
  const [locationLatitude, locationLongitude] = locationString.trim().split(',');

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
    city: cityString as CityType,
    previewImage: previewImage.trim(),
    images: images.split(',').map((image) => image.trim()),
    isPremium: isPremium === 'true',
    rating: Number(rating),
    type: type.trim() as OfferType,
    bedrooms: Number(bedrooms),
    maxGuests: Number(maxGuests),
    price: Number(price),
    goods: goods.split(',').map((it) => it.trim()) as GoodsType[],
    host,
    location,
  };
}
