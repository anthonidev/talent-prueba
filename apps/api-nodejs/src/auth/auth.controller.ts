import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Endpoint para generar un token JWT
   * POST /auth/token
   * En producción, esto debería validar credenciales
   */
  @Post('token')
  generateToken(@Body() body: { username?: string }) {
    const token = this.authService.generateToken(body.username);

    return {
      access_token: token,
      token_type: 'Bearer',
      expires_in: 3600, // 1 hora
    };
  }

  /**
   * Endpoint de información
   * GET /auth
   */
  @Get()
  info() {
    return {
      message: 'Authentication service',
      endpoints: {
        'POST /auth/token': 'Generate JWT token',
      },
      note: 'For testing purposes. In production, this should validate credentials.',
    };
  }
}
