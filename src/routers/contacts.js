import { Router } from 'express';
import {ctrlWrapper} from '../utils/ctrlWrapper.js'
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,

  patchContactController,
} from '../controllers/contacts.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));
router.post('/contacts', ctrlWrapper(createContactController));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

router.patch('/students/:studentId', ctrlWrapper(patchContactController));
export default router;