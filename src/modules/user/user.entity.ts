import typegoose, { defaultClasses, getModelForClass } from '@typegoose/typegoose';
import { EMAIL_REG_EXP } from '../../constants/index.js';
import { createSHA256 } from '../../core/helpers/index.js';
import { User } from '../../types/user.type.js';

const { prop, modelOptions } = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
  },
})
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({
    required: true,
    trim: true,
    minlength: [1, 'Min length for name is 1'],
    maxlength: [15, 'Max length for name is 15'],
  })
  public name!: string;

  @prop({ unique: true, required: true, match: [EMAIL_REG_EXP, 'Email is incorrect'] })
  public email!: string;

  @prop({ required: false }) // TODO добавить валидацию типа файла
  public avatarPath?: string;

  @prop({
    required: true,
    minlength: [6, 'Min length for password is 6'],
    // maxlength: [12, 'Max length for password is 12'],  // TODO как типизировать длинну пароля, учитывая, хеш?
  })
  public password!: string;

  @prop({ required: true, match: [Boolean, 'isPro is incorrect'] })
  public isPro!: boolean;

  constructor(userData: User) {
    super();

    this.name = userData.name;
    this.email = userData.email;
    this.avatarPath = userData.avatarPath;
    this.isPro = userData.isPro;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
