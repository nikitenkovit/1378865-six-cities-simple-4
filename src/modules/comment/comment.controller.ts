import { Request, Response } from 'express';
import { inject } from 'inversify';
import { Controller } from '../../core/controller/controller.abstract.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { CommentServiceInterface } from './comment-service.interface.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import { OfferServiceInterface } from '../offer/offer-service.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { fillDTO } from '../../core/helpers/index.js';
import CommentRdo from './rdo/comment.rdo.js';
import { ValidateDtoMiddleware } from '../../core/middlewares/validate-dto.middleware.js';

const COMMENT_CONTROLLER = 'CommentController';

export default class CommentController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) logger: LoggerInterface,
    @inject(AppComponent.CommentServiceInterface)
    private readonly commentService: CommentServiceInterface,
    @inject(AppComponent.OfferServiceInterface)
    private readonly offerService: OfferServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController…');
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateCommentDto)],
    });
  }

  public async create(
    { body }: Request<object, object, CreateCommentDto>,
    res: Response,
  ): Promise<void> {
    if (!(await this.offerService.exists(body.offerId))) {
      // todo перенести в миделвару
      this.notFound(`Offer with id ${body.offerId} not found.`, COMMENT_CONTROLLER);
    }

    const comment = await this.commentService.create(body);

    await this.offerService.incCommentCount(body.offerId);

    // const swap = await this.offerService.updateRating(body.offerId); // TODO ДОДЕЛАТЬ!!!

    this.created(res, fillDTO(CommentRdo, comment));
  }
}