import express, { Router } from 'express';
import { userControllers } from './user.controller';

import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';
const router: Router = express.Router();

router.post(
  '/create-user',
  validateRequest(userValidation.userSignUpValidationSchemaByZod),
  userControllers.createUser,
);
router.post(
  '/login',
  validateRequest(userValidation.userLogInValidationSchemaByZod),
  userControllers.loginUser,
);

export const userRoutes = router;
