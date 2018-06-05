import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { UsersService } from '../users.service';

@ValidatorConstraint({ name: 'isUserAlreadyExist', async: false })
export class IsUserAlreadyExist implements ValidatorConstraintInterface {
  constructor(private readonly usersService: UsersService) {}

  async validate(text: string, validationArguments: ValidationArguments) {
    const user = await this.usersService.findOne({
      email: text,
    });
    return user ? true : false;
  }
}
