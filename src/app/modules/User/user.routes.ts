import express, { Router } from 'express';
import { userControllers } from './user.controller';

import validateRequest from '../../middlewares/validateRequest';
import userValidationSchemaByZod from './user.validation';
const router: Router = express.Router();

router.post(
  '/create-user',
  validateRequest(userValidationSchemaByZod),
  userControllers.createUser,
);

export const userRoutes = router;
