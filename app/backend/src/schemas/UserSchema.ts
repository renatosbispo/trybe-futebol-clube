import Joi from 'joi';

export default class UserSchema {
  public static email = Joi.string()
    .email({ tlds: false })
    .required()
    .messages({ 'any.required': 'All fields must be filled' });

  public static password = Joi.string()
    .min(7)
    .required()
    .messages({ 'any.required': 'All fields must be filled' });
}
