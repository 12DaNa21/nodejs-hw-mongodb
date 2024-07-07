import { isValidObjectId } from 'mongoose';

import CreateHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(CreateHttpError(404, 'Not found'));
  }

  next();
};
