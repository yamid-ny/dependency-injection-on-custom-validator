import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  // auth
  email: {
    type: String,
    unique: true,
    required: true,
    minLength: 6,
    maxLength: 100,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 100,
  },
  jwtId: {
    type: String,
    unique: true,
    required: true,
    minLength: 22,
    maxLength: 22,
  },
  // info
  name: String,
  lastLogin: Date,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});
