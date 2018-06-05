import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
// auth
import { SignInPayload } from './interfaces/signin-payload.interface';
// security
import * as jwt from 'jsonwebtoken';
import { hash as Hash, compare as Commpare } from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
// user
import { UsersService } from '../users/users.service';
import { User } from '../users/interfaces/user.interface';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async createToken(payload: SignInPayload) {
    const user = await this.login(payload);
    const expiresIn = 3600;
    const accessToken = jwt.sign(
      user,
      'djeu83ieksoSGt6SY8uwe9u2op7tuvvsFAAgJNJa',
      { expiresIn },
    );
    return {
      expiresIn,
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    const user = await this.userService.findOne({
      email: payload.email,
      jwtId: payload.id,
    });

    return user;
  }

  async login(payload: SignInPayload): Promise<JwtPayload> {
    const user = await this.userService.findOne({
      email: payload.email,
    });

    if (!user) throw new UnauthorizedException();

    const isLogin = await Commpare(payload.password, user.password);

    if (!isLogin) throw new UnauthorizedException();

    const jwtUser: JwtPayload = {
      id: user.jwtId,
      email: user.email,
    };

    return jwtUser;
  }

  async register(registerData: SignInPayload): Promise<object> {
    // verify if email exist
    const currentUser = await this.userService.findOne({
      email: registerData.email,
    });
    if (currentUser) throw new BadRequestException();

    // hash (encrypt) password
    const hashPassword = await Hash(registerData.password, 10);
    const newUser = {
      email: registerData.email,
      password: hashPassword,
      jwtId: await this.generateJwtId(),
    };

    const createdUser = await this.userService.create(newUser);

    return {
      email: createdUser.email,
    };
  }

  async generateJwtId(): Promise<string> {
    let result: string;

    do {
      const section1 = Math.random()
        .toString(36)
        .substring(2);

      const section2 = Math.random()
        .toString(36)
        .substring(2);

      result = section1 + section2;
    } while (
      await this.userService.findOne({
        jwtId: result,
      })
    );

    return result;
  }
}
