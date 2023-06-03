import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { AppComponent } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { OfferServiceInterface } from './offer-service.interface';
import { OfferEntity } from './offer.entity';
import CreateOfferDto from './dto/create-offer.dto';
import UpdateOfferDto from './dto/update-offer.dto';
import { DEFAULT_OFFER_COUNT } from './offer.constant.js';
import { SortType } from '../../types/sort-type.enum.js';
import {CommentEntity} from '../comment/comment.entity.js';

@injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(AppComponent.CommentModel)
    private readonly commentModel: types.ModelType<CommentEntity>,
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).populate(['userId', 'city']).exec();
  }

  public async find(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_COUNT;

    return this.offerModel
      .find({}, {}, { limit })
      .sort({ createdAt: SortType.Down })
      .populate(['userId', 'city'])
      .exec();
  }

  public async findByCityID(cityId: string, count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_COUNT;

    return this.offerModel
      .find({ city: cityId }, {}, { limit })
      .populate(['userId', 'city'])
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndDelete(offerId).exec();
  }

  public async updateById(
    offerId: string,
    dto: UpdateOfferDto,
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .populate(['userId', 'city'])
      .exec();
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(
        offerId,
        {
          $inc: {
            commentCount: 1,
          },
        },
        { new: true },
      )
      .exec();
  }

  public async updateRating(offerId: string): Promise<DocumentType<OfferEntity>[]> {
    // TODO доделать!!!
    return await this.commentModel
      .aggregate([
        {
          $group:
              {
                _id: '$offerId',
                avgQuantity: { $avg: '$rating' }
              },
          $match : { offerId : offerId }
        },
      ]).exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({ _id: documentId })) !== null;
  }
}
