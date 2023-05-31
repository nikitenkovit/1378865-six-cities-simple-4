import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { Controller } from '../../core/controller/controller.abstract.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { fillDTO } from '../../core/helpers/index.js';
import { CityServiceInterface } from './city-service.interface.js';
import { CityPath } from './city.constant.js';
import CityRdo from './rdo/city.rdo.js';
import { ParamsDictionary } from 'express-serve-static-core';
import { cityRequestParams } from '../../types/city-request-query.type.js';

const CITY_CONTROLLER = 'CityController';

@injectable()
export default class CityController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.CityServiceInterface)
    private readonly cityService: CityServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for CityController…');

    this.addRoute({ path: CityPath.BASE, method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: CityPath.ONE_BY_ID,
      method: HttpMethod.Get,
      handler: this.getOne,
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const cites = await this.cityService.find();
    const citesToResponse = fillDTO(CityRdo, cites);
    this.ok(res, citesToResponse);
  }

  public async getOne(
    { params }: Request<ParamsDictionary | cityRequestParams>,
    res: Response,
  ): Promise<void> {
    const { cityId } = params;
    const city = await this.cityService.findById(cityId);

    if (!city) {
      this.noContent(CITY_CONTROLLER);
    }

    this.ok(res, fillDTO(CityRdo, city));
  }
}
