import { getCity } from './getCity.js';
import { getUser } from './getUser.js';
import { getLocation } from './getLocation.js';
export const mapLineToOffer = (line) => {
    const [title, description, postDate, city, previewImage, images, isPremium, rating, type, bedrooms, maxGuests, price, goods, host, location,] = line;
    return {
        title,
        description,
        postDate: new Date(postDate),
        city: getCity(city),
        previewImage: previewImage.trim(),
        images: images.split(',').map((image) => image.trim()),
        isPremium: isPremium === 'true',
        rating: Number(rating),
        type: type.trim(),
        bedrooms: Number(bedrooms),
        maxGuests: Number(maxGuests),
        price: Number(price),
        goods: goods.split(',').map((it) => it.trim()),
        host: getUser(host),
        location: getLocation(location),
    };
};
//# sourceMappingURL=mapLineToOffer.js.map