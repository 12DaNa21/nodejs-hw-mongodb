import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../index.js';

export const getAllContacts = async ({ page = 1, perPage = 10, sortOrder = SORT_ORDER.ASC, sortBy = '_id', filter = {} }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;


  const contactsQuery = ContactsCollection.find({ userId: filter.userId });

  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }
  if (filter.isFavourite !== undefined) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }


  const contactsCount = await ContactsCollection.countDocuments(contactsQuery.getFilter());


  const contacts = await contactsQuery.skip(skip).limit(limit).sort({ [sortBy]: sortOrder }).exec();


  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  const contact = await ContactsCollection.findOne({ _id: contactId, userId });
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const deleteContact  = async (contactId, userId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return contact;
};

export const updateContact = async (contactId, payload, userId, options = {}) => {
  try {
    const rawResult = await ContactsCollection.findOneAndUpdate(
      { _id: contactId, userId: userId },
      payload,
      {
        new: true,
        includeResultMetadata: true,
        ...options,
      }
    );

    if (!rawResult) {
      console.log(`Contact with ID ${contactId} not found for user ${userId}`);
      return null;
    }

    return {
      contact: rawResult,
    };
  } catch (error) {
    console.error('Error updating contact:', error);
    throw error;
  }
};
