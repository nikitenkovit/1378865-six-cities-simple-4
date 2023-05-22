import { City, CityType } from '../../types/city.type.js';
import { Coordinates } from '../../types/coordinates.type.js';
import typegoose, { defaultClasses, getModelForClass } from '@typegoose/typegoose';

const { prop, modelOptions } = typegoose;

export interface CityEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'cities',
  },
})
export class CityEntity extends defaultClasses.TimeStamps implements City {
  @prop({ unique: true, required: true, trim: true })
  public name!: CityType;

  @prop({ unique: true, required: true })
  public coordinates!: Coordinates;
}

export const CityModel = getModelForClass(CityEntity);
