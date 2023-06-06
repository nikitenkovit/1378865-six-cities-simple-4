import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Controller } from '../../core/controller/controller.abstract.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import CreateUserDto from './dto/create-user.dto.js';
import { UserServiceInterface } from './user-service.interface.js';
import { ConfigInterface } from '../../core/config/config.interface.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import { createJWT, fillDTO } from '../../core/helpers/index.js';
import UserRdo from './rdo/user.rdo.js';
import LoginUserDto from './dto/login-user.dto.js';
import { ValidateDtoMiddleware } from '../../core/middlewares/validate-dto.middleware.js';
import { ValidateObjectIdMiddleware } from '../../core/middlewares/validate-objectid.middleware.js';
import { UploadFileMiddleware } from '../../core/middlewares/upload-file.middleware.js';
import UpdateUserDto from './dto/update-user.dto.js';
import { UnknownRecord } from '../../types/UnknownRecord.type.js';
import { JWT_ALGORITHM } from './user.constant.js';
import LoggedUserRdo from './rdo/logged-user.rdo.js';
import { PrivateRouteMiddleware } from '../../core/middlewares/private-route.middleware.js';
import { CheckUserMatchMiddleware } from '../../core/middlewares/CheckUserMatch.middleware.js';

const USER_CONTROLLER = 'UserController';

@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.UserServiceInterface) private readonly userService: UserServiceInterface,
    @inject(AppComponent.ConfigInterface)
    private readonly configService: ConfigInterface<RestSchema>,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController…');

    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateUserDto)],
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(LoginUserDto)],
    });
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new PrivateRouteMiddleware(),
        new CheckUserMatchMiddleware(
          this.userService,
          'У пользователя нет прав редактировать данного пользователя.',
        ),
        new ValidateDtoMiddleware(UpdateUserDto),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatarPath'),
      ],
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Get,
      handler: this.checkAuthenticate,
    });
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>,
    res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      this.conflict(`User with email «${body.email}» exists.`, USER_CONTROLLER);
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(res, fillDTO(UserRdo, result));
  }

  public async login(
    { body }: Request<UnknownRecord, UnknownRecord, LoginUserDto>,
    res: Response,
  ): Promise<void> {
    const user = await this.userService.verifyUser(body, this.configService.get('SALT'));

    if (!user) {
      return this.unauthorized(`User with email ${body.email} not found.`, USER_CONTROLLER);
    }

    const token = await createJWT(JWT_ALGORITHM, this.configService.get('JWT_SECRET'), {
      email: user?.email,
      id: user?.id,
    });

    this.ok(
      res,
      fillDTO(LoggedUserRdo, {
        email: user?.email,
        token,
      }),
    );
  }

  public async uploadAvatar(req: Request, res: Response) {
    const { userId } = req.params;

    const updatedUser = await this.userService.updateById(userId, {
      avatarPath: req.file?.filename,
    });
    this.ok<UserRdo>(res, fillDTO(UserRdo, updatedUser));
  }

  public async checkAuthenticate({ user: { email } }: Request, res: Response) {
    const foundedUser = await this.userService.findByEmail(email);

    if (!foundedUser) {
      return this.unauthorized('Unauthorized', USER_CONTROLLER);
    }

    this.ok(res, fillDTO(LoggedUserRdo, foundedUser));
  }
}
