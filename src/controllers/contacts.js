import createHttpError from 'http-errors';
import { createContact, deleteContact, updateContact, getAllContacts, getContactById } from "../services/contacts.js";

export const getContactsController = async (req, res, next) => {
  try {
    const contacts = await getAllContacts();
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

export const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      next(createHttpError(404, 'Contact not found'));
    return;
    };

    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const createContactController = async (req, res) => {
    const contact = await createContact(req.body);
    res.status(201).json({
        status: 201,
        message: `Successfully created a contact!`,
        data: contact,
      });
  };

  export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;

    const contact = await deleteContact(contactId);

    if (!contact) {
      next(createHttpError(404, 'Contact not found'));
      return;
    }

    res.status(204).send();
  };



  export const patchContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);

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
