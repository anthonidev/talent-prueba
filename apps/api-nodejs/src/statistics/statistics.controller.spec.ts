import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';

describe('StatisticsController', () => {
  let controller: StatisticsController;
  let service: StatisticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatisticsController],
      providers: [StatisticsService],
    }).compile();

    controller = module.get<StatisticsController>(StatisticsController);
    service = module.get<StatisticsService>(StatisticsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('calculateStatistics', () => {
    it('should return statistics for valid input', () => {
      const requestDto = {
        q: [
          [1, 0],
          [0, 1],
        ],
        r: [
          [5, 3],
          [0, 2],
        ],
      };

      const result = controller.calculateStatistics(requestDto);

      expect(result).toBeDefined();
      expect(result.max).toBe(5);
      expect(result.min).toBe(0);
      expect(result.sum).toBe(12);
      expect(result.average).toBe(1.5);
      expect(result.is_diagonal).toBe(true);
    });

    it('should call service with correct parameters', () => {
      const requestDto = {
        q: [[1, 2]],
        r: [[3, 4]],
      };

      const spy = jest.spyOn(service, 'calculateStatistics');

      controller.calculateStatistics(requestDto);

      expect(spy).toHaveBeenCalledWith(requestDto.q, requestDto.r);
    });

    it('should return correct structure', () => {
      const requestDto = {
        q: [[1]],
        r: [[2]],
      };

      const result = controller.calculateStatistics(requestDto);

      expect(result).toHaveProperty('max');
      expect(result).toHaveProperty('min');
      expect(result).toHaveProperty('average');
      expect(result).toHaveProperty('sum');
      expect(result).toHaveProperty('is_diagonal');
    });
  });

  describe('healthCheck', () => {
    it('should return health status', () => {
      const result = controller.healthCheck();

      expect(result).toHaveProperty('status');
      expect(result).toHaveProperty('service');
      expect(result).toHaveProperty('timestamp');
      expect(result.status).toBe('healthy');
      expect(result.service).toBe('api-nodejs');
    });

    it('should return valid timestamp', () => {
      const result = controller.healthCheck();

      expect(result.timestamp).toBeDefined();
      expect(new Date(result.timestamp).toString()).not.toBe('Invalid Date');
    });
  });
});
