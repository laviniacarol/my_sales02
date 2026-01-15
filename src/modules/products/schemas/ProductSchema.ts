import { celebrate, Joi, Segments } from "celebrate"

export const createProductSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().positive().precision(2).required(),
    quantity:Joi.number().integer().positive().required() }) });

export const updateProductSchema = celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required() }),
        [Segments.BODY]: Joi.object().keys({
          name: Joi.string().required(),
          price: Joi.number().positive().precision(2).required(),
          quantity: Joi.number().integer().positive().required() }) });

export const idParamValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
  id: Joi.string().required() }) });
