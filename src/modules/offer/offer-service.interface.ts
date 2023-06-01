import { DocumentType } from '@typegoose/typegoose';
import CreateOfferDto from './dto/create-offer.dto';
import { OfferEntity } from './offer.entity';
import UpdateOfferDto from './dto/update-offer.dto';

export interface OfferServiceInterface {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  find(limit?: number): Promise<DocumentType<OfferEntity>[]>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  incCommentCountAndRatingSum(
    offerId: string,
    commentRating: number,
  ): Promise<DocumentType<OfferEntity> | null>;
  updateRating(offerId: string, rating: number): Promise<DocumentType<OfferEntity> | null>;
  exists(documentId: string): Promise<boolean>;
}
