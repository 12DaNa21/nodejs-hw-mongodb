import createHttpError from 'http-errors';
import { createContact, deleteContact, updateContact, getAllContacts, getContactById } from "../services/contacts.js";
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

import { parseContactFilterParams } from '../utils/parseContactFilterParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';
export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const { sortBy, sortOrder } = parseSortParams(req.query);

  const filter = parseContactFilterParams(req.query, req.user._id);

  filter.userId = req.user._id;

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId, req.user._id);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res, next) => {
  const photo = req.file;


  console.log('Received file:', photo);

  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      try {
        photoUrl = await saveFileToCloudinary(photo);
        console.log('File saved to Cloudinary:', photoUrl);
      } catch (error) {
        console.error('Error saving file to Cloudinary:', error);
        return next(createHttpError(500, 'Error saving file to Cloudinary'));
      }
    } else {
      try {
        photoUrl = await saveFileToUploadDir(photo);
        console.log('File saved to upload directory:', photoUrl);
      } catch (error) {
        console.error('Error saving file to upload directory:', error);
        return next(createHttpError(500, 'Error saving file to upload directory'));
      }
    }
  } else {
    console.log('No file received.');
  }

  const payload = {
    ...req.body,
    userId: req.user._id,
    ...(photoUrl && { photo: photoUrl }),
  };

  console.log('Payload for creation:', payload);

  try {
    const contact = await createContact(payload);

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: contact,
    });
  } catch (error) {
    console.error('Error creating contact:', error);
    next(createHttpError(500, 'Internal Server Error'));
  }
};

export const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    console.log('Deleting contact by ID:', contactId);

    const contact = await deleteContact(contactId);

    if (!contact) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error in deleteContactController:', error);
    next(error);
  }
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const photo = req.file;
  const userId = req.user._id;

  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const payload = {
    ...req.body,
    userId: req.user._id,
    photo: photoUrl,
  };

  try {
    const result = await updateContact(contactId, payload, userId);

    if (!result) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res.json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: result.contact,
    });
  } catch (error) {
    console.error('Error in patchContactController:', error);
    next(createHttpError(500, 'Internal Server Error'));
  }
};
