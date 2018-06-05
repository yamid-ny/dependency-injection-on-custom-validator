import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserModelToken') private readonly userModel: Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findById(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async findOne(user: object): Promise<User> {
    return await this.userModel.findOne(user).exec();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async update(id: string, createUserDto: CreateUserDto): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, createUserDto);
  }

  async delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndRemove(id);
  }
}
