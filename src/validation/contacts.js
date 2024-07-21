import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name should be a type of text',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name should have a minimum length of 3 characters',
    'string.max': 'Name should have a maximum length of 20 characters',
    'any.required': 'Name is a required field',
  }),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(7)
    .max(15)
    .required()
    .messages({
      'string.base': 'Phone number should be a type of text',
      'string.empty': 'Phone number cannot be empty',
      'string.pattern.base': 'Phone number can only contain digits',
      'string.min': 'Phone number should have a minimum length of 7 digits',
      'string.max': 'Phone number should have a maximum length of 15 digits',
      'any.required': 'Phone number is a required field',
    }),
  email: Joi.string().email().optional().messages({
    'string.email': 'Please enter a valid email address',
  }),
  isFavourite: Joi.boolean().optional().messages({
    'boolean.base': 'Value should be a boolean (true or false)',
  }),
  contactType: Joi.string().valid('work', 'home', 'personal').required().messages({
    'any.only': 'Contact type must be one of the following: work, home, personal',
    'any.required': 'Contact type is a required field',
  }),
});


export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Name should be a type of text',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name should have a minimum length of 3 characters',
    'string.max': 'Name should have a maximum length of 20 characters',
  }),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(7)
    .max(15)
    .messages({
      'string.base': 'Phone number should be a type of text',
      'string.empty': 'Phone number cannot be empty',
      'string.pattern.base': 'Phone number can only contain digits',
      'string.min': 'Phone number should have a minimum length of 7 digits',
      'string.max': 'Phone number should have a maximum length of 15 digits',
    }),
  email: Joi.string().email().messages({
    'string.email': 'Please enter a valid email address',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'Value should be a boolean (true or false)',
  }),
  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'any.only': 'Contact type must be one of the following: work, home, personal',
  }),
});
