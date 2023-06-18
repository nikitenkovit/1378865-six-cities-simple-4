import { IsNumber, Max, Min } from 'class-validator';

export class Location {
  @IsNumber()
  @Min(-90)
  @Max(90)
  public latitude!: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  public longitude!: number;
}
