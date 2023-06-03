import { RouteInterface } from '../../types/route.interface.js';
import { Response, Router } from 'express';

export interface ControllerInterface {
  readonly router: Router;
  addRoute(route: RouteInterface): void;
  send<T>(res: Response, statusCode: number, data: T): void;
  ok<T>(res: Response, data: T): void;
  created<T>(res: Response, data: T): void;
  noContent<T>(res: Response, data: T): void;
  notFound(errorText: string, detail?: string): void;
  conflict(errorText: string, detail?: string): void;
  unauthorized(errorText: string, detail?: string): void;
  notImplemented(detail?: string): void;
}
