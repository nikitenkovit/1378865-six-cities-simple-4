import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from '../../modules/offer/offer.entity.js';

export interface FindOfferDocumentInterface {
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
}
