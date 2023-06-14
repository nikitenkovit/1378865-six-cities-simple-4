import { IsMongoId, IsNumber, Max, MaxLength, Min, MinLength } from 'class-validator';
import { RATING_PRECISION } from '../../../constants/rating.js';

export default class CreateCommentDto {
  @MinLength(5)
  @MaxLength(1024, { message: 'Maximum text length must be 1024' })
  public text!: string;

  @IsNumber(
    { maxDecimalPlaces: RATING_PRECISION },
    { message: `Допускается максимум ${RATING_PRECISION} числел после запятой` },
  )
  @Min(1, { message: 'Minimum rating is 1' })
  @Max(5, { message: 'Maximum rating is 5' })
  public rating!: number;

  @IsMongoId({ message: 'Categories field must be an array of valid id' })
  public offerId!: string;

  public userId!: string;
}
