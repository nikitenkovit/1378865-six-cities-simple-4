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
import { OfferPath } from './offer.constant.js';
import OfferDetailedRdo from './rdo/offer-detailed.rdo.js';
import { ParamsDictionary } from 'express-serve-static-core';
import UpdateOfferDto from './dto/update-offer.dto.js';

const OFFER_CONTROLLER = 'OfferController';

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.OfferServiceInterface)
    private readonly offerService: OfferServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({ path: OfferPath.BASE, method: HttpMethod.Get, handler: this.index }); // TODO есть способ ЯВНО указать маршрут с необязаьельным параметром ?limit=2
    this.addRoute({ path: OfferPath.ONE_BY_ID, method: HttpMethod.Patch, handler: this.update });
    this.addRoute({
      path: OfferPath.ONE_BY_ID,
      method: HttpMethod.Get,
      handler: this.detailedOffer,
    });
    this.addRoute({
      path: OfferPath.ONE_BY_ID,
      method: HttpMethod.Delete,
      handler: this.delete,
    });
    this.addRoute({ path: OfferPath.BASE, method: HttpMethod.Post, handler: this.create });
  }

  public async index(
    { query }: Request<unknown, unknown, unknown, OfferRequestQuery>,
    res: Response,
  ): Promise<void> {
    const offers = await this.offerService.find(query.limit);
    const offerToResponse = fillDTO(OfferShortRdo, offers);
    this.ok(res, offerToResponse);
  }

  public async detailedOffer(
    { params }: Request<ParamsDictionary | OfferRequestParams>,
    res: Response,
  ): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);

    if (!offer) {
      this.noContent(OFFER_CONTROLLER);
    }

    this.ok(res, fillDTO(OfferDetailedRdo, offer));
  }

  public async delete(
    { params }: Request<ParamsDictionary | OfferRequestParams>,
    res: Response,
  ): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);

    if (!offer) {
      this.noContent(OFFER_CONTROLLER);
    }

    await this.offerService.deleteById(offerId);

    this.ok(res, `Предложение по аренде ID:${offerId} удалено.`);
  }

  public async update(
    { body, params }: Request<ParamsDictionary | OfferRequestParams, Record<string, unknown>, UpdateOfferDto>,
    res: Response
  ): Promise<void> {
    const updatedOffer = await this.offerService.updateById(params.offerId, body);

    if (!updatedOffer) {
      this.noContent(OFFER_CONTROLLER); // TODO завети для всех подобных случаев метон notFound(404)
    }

    this.ok(res, fillDTO(OfferDetailedRdo, updatedOffer));
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    res: Response,
  ): Promise<void> {
    const result = await this.offerService.create(body);
    const createdOffer = await this.offerService.findById(result.id); // TODO фронт должен мапить в объект ID юзера?

    this.created(res, fillDTO(OfferDetailedRdo, createdOffer));
  }
}
