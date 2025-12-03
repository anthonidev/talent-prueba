import { Injectable, Logger } from '@nestjs/common';
import { StatisticsResponseDto } from './statistics.dto';

@Injectable()
export class StatisticsService {
  private readonly logger = new Logger(StatisticsService.name);

  /**
   * Calcula estadísticas sobre las matrices Q y R
   * @param q Matriz Q (ortogonal)
   * @param r Matriz R (triangular superior)
   * @returns Estadísticas calculadas
   */
  calculateStatistics(q: number[][], r: number[][]): StatisticsResponseDto {
    this.logger.log(
      `Calculating statistics for Q(${q.length}x${q[0]?.length}) and R(${r.length}x${r[0]?.length})`,
    );

    // Combinar ambas matrices en un array plano
    const allValues = [...this.flattenMatrix(q), ...this.flattenMatrix(r)];

    if (allValues.length === 0) {
      throw new Error('No values to calculate statistics');
    }

    // Calcular estadísticas
    const max = Math.max(...allValues);
    const min = Math.min(...allValues);
    const sum = allValues.reduce((acc, val) => acc + val, 0);
    const average = sum / allValues.length;
    const isDiagonal = this.isDiagonal(q) || this.isDiagonal(r);

    this.logger.log(
      `Statistics: max=${max}, min=${min}, avg=${average.toFixed(4)}, sum=${sum}, diagonal=${isDiagonal}`,
    );

    return {
      max,
      min,
      average,
      sum,
      is_diagonal: isDiagonal,
    };
  }

  /**
   * Aplana una matriz 2D en un array 1D
   * @param matrix Matriz 2D
   * @returns Array 1D con todos los valores
   */
  private flattenMatrix(matrix: number[][]): number[] {
    return matrix.flat();
  }

  /**
   * Verifica si una matriz es diagonal
   * Una matriz diagonal es aquella donde todos los elementos fuera de la diagonal principal son cero
   * @param matrix Matriz a verificar
   * @returns true si es diagonal, false en caso contrario
   */
  private isDiagonal(matrix: number[][]): boolean {
    // Verificar que sea matriz cuadrada
    const rows = matrix.length;
    if (rows === 0) return false;

    const cols = matrix[0].length;
    if (rows !== cols) {
      // No es cuadrada, no puede ser diagonal
      return false;
    }

    // Verificar que todos los elementos fuera de la diagonal sean aproximadamente cero
    const epsilon = 1e-10; // Tolerancia para comparación de flotantes

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (i !== j && Math.abs(matrix[i][j]) > epsilon) {
          // Elemento fuera de la diagonal no es cero
          return false;
        }
      }
    }

    return true;
  }
}
