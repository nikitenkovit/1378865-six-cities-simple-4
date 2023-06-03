import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { Controller } from '../../core/controller/controller.abstract.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { fillDTO } from '../../core/helpers/index.js';
import { CityServiceInterface } from './city-service.interface.js';
import CityRdo from './rdo/city.rdo.js';
import { ParamsDictionary } from 'express-serve-static-core';
import { cityRequestParams, cityRequestQuery } from '../../types/city-request-query.type.js';
import { OfferServiceInterface } from '../offer/offer-service.interface.js';
import OfferShortRdo from '../offer/rdo/offer-short.rdo.js';
import { ValidateObjectIdMiddleware } from '../../core/middlewares/validate-objectid.middleware.js';

const CITY_CONTROLLER = 'CityController';

@injectable()
export default class CityController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.CityServiceInterface)
    private readonly cityService: CityServiceInterface,
    @inject(AppComponent.OfferServiceInterface)
    private readonly offerService: OfferServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for CityController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/:cityId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [new ValidateObjectIdMiddleware('cityId')],
    });

    this.addRoute({
      path: '/:cityId/offers',
      method: HttpMethod.Get,
      handler: this.getOffersFromCategory, // todo 123 добавить обязательно валидацию проверки существования города в базе
      middlewares: [new ValidateObjectIdMiddleware('cityId')],
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const cites = await this.cityService.find();
    const citesToResponse = fillDTO(CityRdo, cites);
    this.ok(res, citesToResponse);
  }

  public async show(
    { params }: Request<ParamsDictionary | cityRequestParams>,
    res: Response,
  ): Promise<void> {
    const { cityId } = params;
    const city = await this.cityService.findById(cityId);

    if (!city) {
      this.notFound(`City with id ${cityId} not found.`, CITY_CONTROLLER);
    }

    this.ok(res, fillDTO(CityRdo, city));
  }

  public async getOffersFromCategory(
    {
      params,
      query,
    }: Request<ParamsDictionary | cityRequestParams, unknown, unknown, cityRequestQuery>,
    res: Response,
  ): Promise<void> {
    const offers = await this.offerService.findByCityID(params.cityId, query.limit);
    this.ok(res, fillDTO(OfferShortRdo, offers));
  }
}