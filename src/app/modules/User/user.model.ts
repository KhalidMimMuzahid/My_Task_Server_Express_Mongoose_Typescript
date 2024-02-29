/* eslint-disable @typescript-eslint/no-this-alias */

import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import encrypt from '../../utils/cryptPass';

export const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      // unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },

  // this option is for tracking the createdAt and updatedAt fields
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  const user = this;
  //check if user is already exists or not
  const existingUser = await User.findOne({ email: user?.email });
  if (existingUser?.email) {
    throw new AppError(httpStatus.NOT_FOUND, 'User email is already exists');
  }
  //hashing password and save into DB

  await encrypt.cryptPassword(user.password);
  user.password = await encrypt.cryptPassword(user.password);
  next();
});

// post save middleware / hook : will work on create() or save() after saving
userSchema.post('save', async function (userData, next) {
  //remove password field after saving user for sending response to the user
  userData.password = undefined;
  next();
});

export const User = model<TUser>('User', userSchema);
