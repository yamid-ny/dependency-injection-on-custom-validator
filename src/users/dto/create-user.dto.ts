import {
  IsString,
  IsEmail,
  Length,
  Validate,
} from 'class-validator';
import { IsUserAlreadyExist } from './is-user-already-exist';

export class CreateUserDto {
  @Length(6, 100)
  @IsEmail()
  @Validate(IsUserAlreadyExist)
  readonly email: string;

  @Length(6, 100)
  @IsString()
  readonly password: string;
}
