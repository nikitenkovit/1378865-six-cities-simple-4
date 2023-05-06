import { CityType } from '../types/city-type.enum';
export declare const getCity: (data: string) => {
    name: CityType;
    coordinates: {
        latitude: number;
        longitude: number;
    };
};
