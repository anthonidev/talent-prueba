import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  /**
   * Genera un token JWT para testing
   * En producción, esto debería validar credenciales reales
   */
  generateToken(username: string = 'interseguro-api'): string {
    const payload = {
      sub: '1',
      username: username,
    };

    return this.jwtService.sign(payload);
  }

  /**
   * Valida un token JWT
   */
  validateToken(token: string): any {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      return null;
    }
  }
}
