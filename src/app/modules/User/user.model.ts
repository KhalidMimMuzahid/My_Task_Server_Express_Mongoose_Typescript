/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import config from '../../config';

export const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
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
  //hashing password and save into DB
  user.password = await bcrypt.hash(user.password, Number(config.saltRound));
  next();
});

// post save middleware / hook : will work on create() or save() after saving
userSchema.post('save', function (doc, next) {
  //remove password field after saving user for sending response to the user
  doc.password = undefined;
  next();
});

export const User = model<TUser>('User', userSchema);
