import { Router } from "express";
import { createContactController, deleteContactController, getContactByIdController, getContactsController, patchContactController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import validateBody from "../middlewares/validateBody.js";
import { createContactSchema, updateContactSchema } from "../validation/contacts.js";
import isValidId from "../middlewares/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";

// import { isValidId } from "../middlewares/isValidId.js";

const router = Router();

router.use(authenticate);

router.get('/contacts', ctrlWrapper(getContactsController));
router.post('/contacts', validateBody(createContactSchema), ctrlWrapper(createContactController));
router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactByIdController));
router.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContactController));
router.put('/contacts/:contactId', isValidId, validateBody(createContactSchema), ctrlWrapper(createContactController));
router.patch('/contacts/:contactId', isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContactController));

export default router;
