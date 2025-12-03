export interface Statistics {
  max: number;
  min: number;
  average: number;
  sum: number;
  is_diagonal: boolean;
}

export interface QRResponse {
  q: number[][];
  r: number[][];
  statistics: Statistics;
}

export interface AuthTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface MatrixRequest {
  matrix: number[][];
}
