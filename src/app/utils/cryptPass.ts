/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcrypt';
import config from '../config';
// bcrypt = require("bcrypt");

const encrypt = {
  cryptPassword: (password: string) =>
    bcrypt
      .genSalt(Number(config.saltRound))
      .then((salt: string) => bcrypt.hash(password, salt))
      .then((hash: any) => hash),

  comparePassword: (password: string, hashPassword: string) =>
    bcrypt.compare(password, hashPassword).then((resp) => resp),
};

export default encrypt;
