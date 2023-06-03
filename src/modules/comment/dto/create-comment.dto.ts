import { IsInt, IsMongoId, Max, MaxLength, Min, MinLength } from 'class-validator';

export default class CreateCommentDto {
  @MinLength(5, { message: 'Minimum text length must be 5' })
  @MaxLength(1024, { message: 'Maximum text length must be 1024' })
  public text!: string;

  @IsInt({ message: 'rating must be an integer' })
  @Min(1, { message: 'Minimum rating is 1' })
  @Max(5, { message: 'Maximum rating is 5' })
  public rating!: number;

  @IsMongoId({ message: 'Categories field must be an array of valid id' })
  public offerId!: string;

  @IsMongoId({ message: 'Categories field must be an array of valid id' })
  public userId!: string;
}
