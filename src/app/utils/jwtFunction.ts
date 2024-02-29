import jwt from 'jsonwebtoken';
import config from '../config';

const generateToken = (email: string) => {
  const token = jwt.sign({ email }, config?.private_key as string, {
    algorithm: 'HS256',
    expiresIn: '24h',
  });
  return token;
};
const decodeToken = (token: string) => {
  const decoded = jwt.verify(token, config.private_key as string);
  return decoded;
};

export const jwtFunc = {
  generateToken,
  decodeToken,
};
