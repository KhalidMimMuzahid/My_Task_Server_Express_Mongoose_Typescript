import encrypt from '../../utils/cryptPass';
import { jwtFunc } from '../../utils/jwtFunction';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  const token = jwtFunc.generateToken(payload.email as string);
  return { ...result, token };
};
const logInUser = async (payload: Partial<TUser>) => {
  let authInfo: Record<string, string | boolean> = { success: false };
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    authInfo = { error: 'User not found' };
  } else {
    const isValidUser = await encrypt.comparePassword(
      payload?.password as string,
      user?.password,
    );
    if (!isValidUser) {
      authInfo = { error: 'Invalid Password' };
    } else {
      const token = jwtFunc.generateToken(payload.email as string);
      authInfo = { success: true, token };
    }
  }

  return authInfo;
};
export const userServices = {
  createUserIntoDB,
  logInUser,
};
