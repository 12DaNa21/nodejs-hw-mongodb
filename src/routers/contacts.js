import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  patchContactController,
} from '../controllers/contacts.js';
import validateBody from '../middlewares/validateBody.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';


const router = Router();

router.get('/', ctrlWrapper(getContactsController));
router.post('', validateBody(createContactSchema), ctrlWrapper(createContactController));
router.get('/:contactId', ctrlWrapper(getContactByIdController));
router.delete('/:contactId', ctrlWrapper(deleteContactController));
router.put('/:contactId', validateBody(createContactSchema), ctrlWrapper(createContactController));
router.patch('/:contactId', validateBody(updateContactSchema), ctrlWrapper(patchContactController));

export default router;
