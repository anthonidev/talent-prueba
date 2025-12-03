import { IsArray, ArrayNotEmpty, ArrayMinSize } from 'class-validator';

/**
 * DTO para recibir las matrices Q y R desde la API de Go
 */
export class StatisticsRequestDto {
  @IsArray()
  @ArrayNotEmpty({ message: 'Q matrix cannot be empty' })
  @ArrayMinSize(1, { message: 'Q matrix must have at least one row' })
  q: number[][];

  @IsArray()
  @ArrayNotEmpty({ message: 'R matrix cannot be empty' })
  @ArrayMinSize(1, { message: 'R matrix must have at least one row' })
  r: number[][];
}

/**
 * DTO para la respuesta de estadísticas
 */
export class StatisticsResponseDto {
  max: number;
  min: number;
  average: number;
  sum: number;
  is_diagonal: boolean;
}
