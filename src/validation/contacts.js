import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  phoneNumber: Joi.string().pattern(/^[0-9]{6,16}$/).min(7)
  .max(15).required().messages({
    'string.pattern.base': 'Phone number must be a string of 6 to 16 digits',
    'any.required': 'Phone number is required',
  }),
  email: Joi.string().email().messages({
    'string.email': 'Email must be a valid email address',
  }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal').required().messages({
    'any.only': 'Contact type must be one of work, home, or personal',
    'any.required': 'Contact type is required',

  }),
  photo: Joi.string().optional().messages({
    'string.base': 'Photo should be a type of text',
  }),
});



export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
  }),
  phoneNumber: Joi.string().pattern(/^[0-9]{6,16}$/).min(7)
  .max(15).messages({
    'string.pattern.base': 'Phone number must be a string of 6 to 16 digits',
    'any.required': 'Phone number is required',
  }),
  email: Joi.string().email().messages({
    'string.email': 'Email must be a valid email address',
  }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'any.only': 'Contact type must be one of work, home, or personal',
    'any.required': 'Contact type is required',
  }),
  photo: Joi.string().messages({
    'string.base': 'Photo should be a type of text',
  }),
});
