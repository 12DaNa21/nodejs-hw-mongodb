import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  patchContactController,
} from '../controllers/contacts.js';
import  validateBody  from '../middlewares/validateBody.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';
import  isValidId  from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const router = Router();
router.use(authenticate);
router.get('/', ctrlWrapper(getContactsController));
router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));
router.post('', upload.single('photo'), validateBody(createContactSchema),ctrlWrapper(createContactController));
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));
router.put('/:contactId', upload.single('photo'), isValidId, validateBody(createContactSchema), ctrlWrapper(createContactController));
router.patch('/:contactId', upload.single('photo'), isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContactController));

export default router;
