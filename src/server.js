import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './utils/env.js';
import authRouter from './routers/auth-router.js';
import contactsRouter from './routers/contacts-router.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

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

  app.listen(PORT, () => console.log(`Server running on ${PORT} PORT`));
};
