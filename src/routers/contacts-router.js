import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  patchContactController,
} from '../controllers/contacts-controler.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts-validation.js';


const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getContactsController));
contactsRouter.post('', validateBody(createContactSchema), ctrlWrapper(createContactController));
contactsRouter.get('/:contactId', ctrlWrapper(getContactByIdController));
contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactController));
contactsRouter.put('/:contactId', validateBody(createContactSchema), ctrlWrapper(createContactController));
contactsRouter.patch('/:contactId', validateBody(updateContactSchema), ctrlWrapper(patchContactController));

export default contactsRouter;
