import { IsBoolean, IsEmail, MaxLength, MinLength } from 'class-validator';

export default class CreateUserDto {
  @MinLength(1, { message: 'Minimum name length must be 1' })
  @MaxLength(100, { message: 'Maximum name length must be 15' })
  public name!: string;

  @IsEmail({}, { message: 'Fail! Email must be valid address' })
  public email!: string;

  public avatarPath?: string;

  @MinLength(6, { message: 'Minimum password length must be 6' })
  @MaxLength(12, { message: 'Maximum password length must be 12' })
  public password!: string;

  @IsBoolean({ message: 'Field isPro must be an boolean' })
  public isPro!: boolean;
}
