import { IsNumber } from 'class-validator';

export class Location {
  @IsNumber()
  public latitude!: number;

  @IsNumber()
  public longitude!: number;
}
