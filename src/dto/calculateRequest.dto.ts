import { IsString } from 'class-validator';

export class CalculateRequestDTO {
  @IsString()
  expression: string;
}
