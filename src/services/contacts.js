import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  type,
  isFavourite,
}) => {
  try {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    let contactsQuery = ContactsCollection.find();

    if (type) {
      contactsQuery = contactsQuery.where('contactType').equals(type);
    }
    if (isFavourite !== undefined) {
      contactsQuery = contactsQuery.where('isFavourite').equals(isFavourite);
    }

    const contactsCount = await contactsQuery.clone().countDocuments();
    const contacts = await contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec();

    const paginationData = calculatePaginationData(contactsCount, perPage, page);

    console.log('Contacts fetched successfully:', contacts);

    return {
      data: contacts,
      ...paginationData,
    };
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};

export const getContactById = async (contactId) => {
  try {
    console.log('Trying to find contact by ID:', contactId);

    const contact = await ContactsCollection.findById(contactId);

    console.log('Found contact:', contact);

    return contact;
  } catch (error) {
    console.error('Error finding contact by ID:', error);
    throw error;
  }
};

export const createContact = async (payload) => {
  try {
    const contact = await ContactsCollection.create(payload);
    return contact;
  } catch (error) {
    console.error('Error creating contact:', error);
    throw error;
  }
};

export const deleteContact = async (contactId) => {
  try {
    const contact = await ContactsCollection.findOneAndDelete({ _id: contactId });
    return contact;
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw error;
  }
};

export const updateContact = async (contactId, payload, options = {}) => {
  try {
    const rawResult = await ContactsCollection.findOneAndUpdate(
      { _id: contactId },
      payload,
      {
        new: true,
        includeResultMetadata: true,
        ...options,
      }
    );

    if (!rawResult) return null;

    return {
      contact: rawResult,
    };
  } catch (error) {
    console.error('Error updating contact:', error);
    throw error;
  }
};
