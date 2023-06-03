import { Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { injectable } from 'inversify';
import asyncHandler from 'express-async-handler';
import { ControllerInterface } from './controller.interface.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import { RouteInterface } from '../../types/route.interface.js';
import HttpError from '../errors/http-error.js';

@injectable()
export abstract class Controller implements ControllerInterface {
  private readonly _router: Router;

  constructor(protected readonly logger: LoggerInterface) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public addRoute(route: RouteInterface) {
    const routeHandler = asyncHandler(route.handler.bind(this));
    const middlewares = route.middlewares?.map(
      (middleware) => asyncHandler(middleware.execute.bind(middleware))
    );

    const allHandlers = middlewares ? [...middlewares, routeHandler] : routeHandler;
    this._router[route.method](route.path, allHandlers);
    this.logger.info(`Route registered: ${route.method.toUpperCase()} ${route.path}`);
  }

  public send<T>(res: Response, statusCode: number, data: T): void {
    res.type('application/json').status(statusCode).json(data);
  }

  public ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }

  public created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  // TODO Переделать ошибки

  public notFound(errorText: string, detail?: string): void {
    throw new HttpError(StatusCodes.NOT_FOUND, errorText, detail);
  }

  public noContent<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.NO_CONTENT, data);
  }

  public conflict(errorText: string, detail?: string): void {
    throw new HttpError(StatusCodes.CONFLICT, errorText, detail);
  }

  public unauthorized(errorText: string, detail?: string): void {
    throw new HttpError(StatusCodes.UNAUTHORIZED, errorText, detail);
  }

  public notImplemented(detail?: string): void {
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented', detail);
  }
}
