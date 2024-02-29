import { RequestHandler } from 'express';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { userServices } from './user.service';
import AppError from '../../errors/AppError';
// import userValidationSchemaByZod from './user.validation';

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await userServices.createUserIntoDB(userData);
  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});
const loginUser: RequestHandler = catchAsync(async (req, res) => {
  const authData = req.body;
  const result = await userServices.logInUser(authData);
  if (result.success) {
    // send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User logged in successfully',
      data: result,
    });
  } else {
    throw new AppError(httpStatus.NOT_FOUND, result?.error as string);
  }
});
export const userControllers = {
  createUser,
  loginUser,
};
