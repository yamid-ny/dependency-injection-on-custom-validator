import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { DatabaseModule } from '../database/database.module';
import { IsUserAlreadyExist } from './dto/is-user-already-exist';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    ...usersProviders,
    UsersService,
    IsUserAlreadyExist,
  ],
  exports: [UsersService],
})
export class UsersModule {}
