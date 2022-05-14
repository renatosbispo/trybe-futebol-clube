import Joi from 'joi';

export default class UserSchema {
  protected static requiredMessage = 'All fields must be filled';

  public static email = Joi.string()
    .email({ tlds: false })
    .required()
    .messages({
      'any.required': this.requiredMessage,
      'string.empty': this.requiredMessage,
      'string.email': 'Incorrect email or password',
    });

  public static password = Joi.string()
    .min(7)
    .required()
    .messages({
      'any.required': this.requiredMessage,
      'string.empty': this.requiredMessage,
    });
}
