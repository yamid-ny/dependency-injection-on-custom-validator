import { Document } from 'mongoose';

export interface User extends Document {
  // auth
  readonly email: string;
  readonly password: string;
  readonly jwtId: string;
  // info
  readonly name: string;
  readonly lastLogin: string;
}
