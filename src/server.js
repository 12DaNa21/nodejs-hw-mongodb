import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './utils/env.js';
import authRouter from './routers/auth-router.js';
import contactsRouter from './routers/contacts-router.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { getAllContacts, getContactById } from "../services/contacts-servic.js";
const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();
  const logger = pino({
    transport: {
        target: "pino-pretty"
    }
  });

  app.use(logger);
  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());


  app.use("/api/auth", authRouter);
  app.use("/api/contacts", contactsRouter);


  app.use(notFoundHandler);
  app.use(errorHandler);

  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await getAllContacts();
      res.status(200).json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: 'Failed to fetch contacts',
        error: err.message,
      });
    }
  });

  app.get('/contacts/:contactId', async (req, res) => {
    try {
      const { contactId } = req.params;
      const contact = await getContactById(contactId);

      if (!contact) {
        return res.status(404).json({
          status: 404,
          message: `Contact with id ${contactId} not found`,
        });
      }

      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: 'Failed to fetch contact',
        error: err.message,
      });
    }
  });




  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
