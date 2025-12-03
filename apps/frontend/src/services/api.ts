import axios, { AxiosInstance } from 'axios';
import { QRResponse, AuthTokenResponse } from '@/types';

const API_GO_URL = process.env.NEXT_PUBLIC_API_GO_URL || 'http://localhost:8080';
const API_NODE_URL = process.env.NEXT_PUBLIC_API_NODE_URL || 'http://localhost:3000';

class APIService {
  private goApi: AxiosInstance;
  private nodeApi: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.goApi = axios.create({
      baseURL: API_GO_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.nodeApi = axios.create({
      baseURL: API_NODE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Obtener token JWT
  async getToken(): Promise<string> {
    if (this.token) {
      return this.token;
    }

    try {
      const response = await this.nodeApi.post<AuthTokenResponse>('/auth/token', {});
      this.token = response.data.access_token;
      return this.token;
    } catch (error) {
      console.error('Error getting token:', error);
      throw new Error('Failed to authenticate');
    }
  }

  // Procesar matriz con factorización QR
  async processMatrix(matrix: number[][]): Promise<QRResponse> {
    try {
      const response = await this.goApi.post<QRResponse>('/api/qr', {
        matrix,
      });
      return response.data;
    } catch (error: unknown) {
      console.error('Error processing matrix:', error);
      throw new Error(
        (error as { response: { data: { error: string } } }).response?.data?.error || 'Failed to process matrix'
      );
    }
  }

  // Health check de ambas APIs
  async healthCheck(): Promise<{ go: boolean; node: boolean }> {
    try {
      const [goHealth, nodeHealth] = await Promise.allSettled([
        this.goApi.get('/health'),
        this.nodeApi.get('/api/statistics/health'),
      ]);

      return {
        go: goHealth.status === 'fulfilled',
        node: nodeHealth.status === 'fulfilled',
      };
    } catch (error) {
      return { go: false, node: false };
    }
  }
}

export const apiService = new APIService();
