import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Logger,
  Get,
  UseGuards,
} from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import {
  StatisticsRequestDto,
  StatisticsResponseDto,
} from './statistics.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/statistics')
export class StatisticsController {
  private readonly logger = new Logger(StatisticsController.name);

  constructor(private readonly statisticsService: StatisticsService) {}

  /**
   * Endpoint para calcular estadísticas de las matrices Q y R
   * POST /api/statistics
   * Requiere autenticación JWT
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  calculateStatistics(
    @Body() body: StatisticsRequestDto,
  ): StatisticsResponseDto {
    this.logger.log('Received request to calculate statistics');

    try {
      const statistics = this.statisticsService.calculateStatistics(
        body.q,
        body.r,
      );

      return statistics;
    } catch (error) {
      this.logger.error('Error calculating statistics', error.stack);
      throw error;
    }
  }

  /**
   * Health check endpoint
   * GET /api/statistics/health
   */
  @Get('health')
  healthCheck() {
    return {
      status: 'healthy',
      service: 'api-nodejs',
      timestamp: new Date().toISOString(),
    };
  }
}
