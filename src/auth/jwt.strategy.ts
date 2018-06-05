import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'djeu83ieksoSGt6SY8uwe9u2op7tuvvsFAAgJNJa',
    });
  }

  async validate(payload: JwtPayload, done: (...args: any[]) => void) {
    const user = await this.authService.validateUser(payload);
    if (!user) return done(new UnauthorizedException(), false);
    done(null, user);
  }
}
