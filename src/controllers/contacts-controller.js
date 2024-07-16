import createHttpError from 'http-errors';

import { createContact, deleteContact, updateContact, getAllContacts, getContactById } from "../services/contacts-service.js";
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export const getContactsController = async (req, res, next) => {
  try {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);

    console.log('Fetching contacts with params:', { page, perPage, sortBy, sortOrder });

    const contacts = await getAllContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
    });

    const paginationData = calculatePaginationData(contacts.totalItems, perPage, page);

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: {
        contacts: contacts.data,
        ...paginationData,
      },
    });
  } catch (error) {
    console.error('Error in getContactsController:', error);
    next(error);
  }
};

export const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    console.log('Fetching contact by ID:', contactId);

    const contact = await getContactById(contactId);

    if (!contact) {
      return next(createHttpError(404, 'Contact not found'));
    }

    console.log('Found contact:', contact);

    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    console.error('Error in getContactByIdController:', error);
    next(error);
  }
};

export const createContactController = async (req, res, next) => {
  try {
    console.log('Creating contact with data:', req.body);

    const contact = await createContact(req.body);
    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: contact,
    });
  } catch (error) {
    console.error('Error in createContactController:', error);
    next(error);
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
  try {
    const { contactId } = req.params;
    console.log('Patching contact by ID:', contactId, 'with data:', req.body);

    const result = await updateContact(contactId, req.body);

    if (!result) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res.json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: result,
    });
  } catch (error) {
    console.error('Error in patchContactController:', error);
    next(error);
  }



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

export const createContactController = async (req, res) => {
  const payload = {
    ...req.body,
    userId: req.user._id,
  };

  const student = await createContact(payload);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: student,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await deleteContact(contactId, req.user._id);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};

export const upsertContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const payload = {
    ...req.body,
    userId: req.user._id,
  };

  const result = await updateContact(contactId, payload, {
    upsert: true,
  });

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a contact!`,
    data: result.contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const photo = req.file;

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

  const result = await updateContact(contactId, payload);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });

};
