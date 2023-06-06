import { Expose } from 'class-transformer';

export default class OfferImagesRdo {
  @Expose()
  public images!: string[];
}
