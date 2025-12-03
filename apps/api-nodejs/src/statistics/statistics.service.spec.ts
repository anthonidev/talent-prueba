import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsService } from './statistics.service';

describe('StatisticsService', () => {
  let service: StatisticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatisticsService],
    }).compile();

    service = module.get<StatisticsService>(StatisticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('calculateStatistics', () => {
    it('should calculate correct statistics for simple matrices', () => {
      const q = [
        [1, 0],
        [0, 1],
      ];
      const r = [
        [5, 3],
        [0, 2],
      ];

      const result = service.calculateStatistics(q, r);

      expect(result.max).toBe(5);
      expect(result.min).toBe(0);
      expect(result.sum).toBe(12);
      expect(result.average).toBe(1.5);
    });

    it('should detect diagonal matrix (identity matrix)', () => {
      const q = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ];
      const r = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ];

      const result = service.calculateStatistics(q, r);

      expect(result.is_diagonal).toBe(true);
    });

    it('should detect non-diagonal matrix', () => {
      const q = [
        [1, 2],
        [3, 4],
      ];
      const r = [
        [5, 6],
        [7, 8],
      ];

      const result = service.calculateStatistics(q, r);

      expect(result.is_diagonal).toBe(false);
    });

    it('should handle negative numbers correctly', () => {
      const q = [
        [-5, -2],
        [-1, -8],
      ];
      const r = [
        [3, 10],
        [0, -4],
      ];

      const result = service.calculateStatistics(q, r);

      expect(result.max).toBe(10);
      expect(result.min).toBe(-8);
      expect(result.sum).toBe(-7);
    });

    it('should calculate average with precision', () => {
      const q = [[1, 2, 3]];
      const r = [[4, 5, 6]];

      const result = service.calculateStatistics(q, r);

      expect(result.average).toBe(3.5); // (1+2+3+4+5+6) / 6 = 21/6 = 3.5
      expect(result.sum).toBe(21);
    });

    it('should handle single element matrices', () => {
      const q = [[5]];
      const r = [[10]];

      const result = service.calculateStatistics(q, r);

      expect(result.max).toBe(10);
      expect(result.min).toBe(5);
      expect(result.sum).toBe(15);
      expect(result.average).toBe(7.5);
      expect(result.is_diagonal).toBe(true); // Single element is diagonal
    });

    it('should handle matrices with zeros', () => {
      const q = [
        [0, 0],
        [0, 0],
      ];
      const r = [
        [1, 0],
        [0, 1],
      ];

      const result = service.calculateStatistics(q, r);

      expect(result.max).toBe(1);
      expect(result.min).toBe(0);
      expect(result.sum).toBe(2);
      expect(result.average).toBe(0.25); // 2/8 = 0.25
    });

    it('should detect diagonal matrix with small off-diagonal values', () => {
      const q = [
        [5, 0.0000000001],
        [0.0000000001, 3],
      ];
      const r = [
        [1, 0],
        [0, 1],
      ];

      const result = service.calculateStatistics(q, r);

      // Should be considered diagonal due to epsilon tolerance
      expect(result.is_diagonal).toBe(true);
    });

    it('should handle rectangular (non-square) matrices', () => {
      const q = [
        [1, 2, 3],
        [4, 5, 6],
      ];
      const r = [
        [7, 8],
        [9, 10],
      ];

      const result = service.calculateStatistics(q, r);

      expect(result.max).toBe(10);
      expect(result.min).toBe(1);
      expect(result.is_diagonal).toBe(false); // Rectangular matrices can't be diagonal
    });
  });
});
