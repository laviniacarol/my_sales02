import { celebrate, Joi, Segments } from "celebrate";

export const idParamsValidate = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required()
    },
  )
})

export const CreateCustomerSchema = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
  },
})

export const UpdateCustomerSchema = celebrate({
  [Segments.BODY]: {
    name: Joi.string(),
    email: Joi.string().email(),
  },
})
