import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { envs } from '../config/envs';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: envs.JWT_SECRET,
      signOptions: {
        expiresIn: '1h', // Token válido por 1 hora
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule { }
