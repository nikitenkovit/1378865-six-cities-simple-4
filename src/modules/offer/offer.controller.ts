import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { Controller } from '../../core/controller/controller.abstract.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import { fillDTO } from '../../core/helpers/index.js';
import OfferShortRdo from './rdo/offer-short.rdo.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import { OfferRequestParams, OfferRequestQuery } from '../../types/offer-request-query.type.js';
import OfferDetailedRdo from './rdo/offer-detailed.rdo.js';
import { ParamsDictionary } from 'express-serve-static-core';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { OfferEntity } from './offer.entity';
import { CommentServiceInterface } from '../comment/comment-service.interface.js';
import CommentRdo from '../comment/rdo/comment.rdo.js';
import { ValidateObjectIdMiddleware } from '../../core/middlewares/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../core/middlewares/validate-dto.middleware.js';

const OFFER_CONTROLLER = 'OfferController';

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.OfferServiceInterface)
    private readonly offerService: OfferServiceInterface,
    @inject(AppComponent.CommentServiceInterface)
    private readonly commentService: CommentServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
      ],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [new ValidateObjectIdMiddleware('offerId')],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [new ValidateObjectIdMiddleware('offerId')],
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateOfferDto)],
    });
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [new ValidateObjectIdMiddleware('offerId')],
    });
  }

  public async index(
    { query }: Request<unknown, unknown, unknown, OfferRequestQuery>,
    res: Response,
  ): Promise<void> {
    const offers = await this.offerService.find(query.limit);
    const offerToResponse = fillDTO(OfferShortRdo, offers);
    this.ok<OfferShortRdo>(res, offerToResponse);
  }

  public async show(
    { params }: Request<ParamsDictionary | OfferRequestParams>,
    res: Response,
  ): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);

    if (!offer) {
      this.notFound(`Offer with id ${offerId} not found.`, OFFER_CONTROLLER);
    }

    this.ok<OfferDetailedRdo>(res, fillDTO(OfferDetailedRdo, offer));
  }

  public async delete(
    { params }: Request<ParamsDictionary | OfferRequestParams>,
    res: Response,
  ): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);

    await this.offerService.deleteById(offerId);

    if (!offer) {
      return this.notFound(`Offer with id ${offerId} not found.`, OFFER_CONTROLLER);
    }

    await this.commentService.deleteByOfferId(offerId);

    this.noContent<OfferEntity>(res, offer);
  }

  public async update(
    {
      body,
      params,
    }: Request<ParamsDictionary | OfferRequestParams, Record<string, unknown>, UpdateOfferDto>,
    res: Response,
  ): Promise<void> {
    const updatedOffer = await this.offerService.updateById(params.offerId, body);

    if (!updatedOffer) {
      this.notFound(`Offer with id ${params.offerId} not found.`, OFFER_CONTROLLER);
    }

    this.ok<OfferDetailedRdo>(res, fillDTO(OfferDetailedRdo, updatedOffer));
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    res: Response,
  ): Promise<void> {
    const result = await this.offerService.create(body);
    const createdOffer = await this.offerService.findById(result.id);

    this.created<OfferDetailedRdo>(res, fillDTO(OfferDetailedRdo, createdOffer));
  }

  public async getComments(
    { params }: Request<ParamsDictionary | OfferRequestParams, object, object>,
    res: Response,
  ): Promise<void> {
    if (!(await this.offerService.exists(params.offerId))) {
      this.notFound(`Offer with id ${params.offerId} not found.`, OFFER_CONTROLLER);
    }

    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }
}
