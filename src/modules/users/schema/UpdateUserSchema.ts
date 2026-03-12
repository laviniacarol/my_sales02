import { celebrate, Joi, Segments } from "celebrate";
import { join } from "path";

export const UpdateUserSchema = celebrate ({
  [Segments.BODY]: {
    name: Joi.string(),
    email: Joi.string().email(),
    oldPassword: Joi.string(),
    password: Joi.string().optional(),
    password_confirmation: Joi.string()
    .valid(Joi.ref("password"))
    .when('password', {
      is: Joi.exist(),
      then: Joi.required(),
      otherwise: Joi.optional()
    }),
  },
})
