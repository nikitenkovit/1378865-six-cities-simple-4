import { Expose } from 'class-transformer';

export default class OfferPreviewImageRdo {
  @Expose()
  public previewImage!: string;
}
