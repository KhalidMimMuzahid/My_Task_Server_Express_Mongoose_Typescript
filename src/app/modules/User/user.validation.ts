import { z } from 'zod';

const userSignUpValidationSchemaByZod = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name must be required',
      invalid_type_error: 'name must be string',
    }),
    email: z.string({
      required_error: 'email must be required',
      invalid_type_error: 'email must be string',
    }),
    password: z
      .string({
        required_error: 'password must be required',
        invalid_type_error: 'password must be string',
      })
      .max(20, { message: "Password can't be more than 20 characters" }),
  }),
});
const userLogInValidationSchemaByZod = z.object({
  body: z.object({
    email: z.string({
      required_error: 'email must be required',
      invalid_type_error: 'email must be string',
    }),
    password: z.string({
      required_error: 'password must be required',
      invalid_type_error: 'password must be string',
    }),
  }),
});
export const userValidation = {
  userSignUpValidationSchemaByZod,
  userLogInValidationSchemaByZod,
};
