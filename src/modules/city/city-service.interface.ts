import { DocumentType } from '@typegoose/typegoose';
import CreateCityDto from './dto/create-city.dto';
import { CityEntity } from './city.entity';

export interface CityServiceInterface {
  create(dto: CreateCityDto): Promise<DocumentType<CityEntity>>;
  findByName(name: string): Promise<DocumentType<CityEntity> | null>;
  findOrCreate(dto: CreateCityDto): Promise<DocumentType<CityEntity>>;
  find(): Promise<DocumentType<CityEntity>[]>;
  findById(offerId: string): Promise<DocumentType<CityEntity> | null>;
}
