import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';

import authRouter from './routers/auth-router.js';
import contactsRouter from './routers/contacts-router.js';

import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';

const port = env("PORT", "3000");


const setupServer = () => {
    const app = express();


    const logger = pino({
        transport: {
            target: "pino-pretty"
        }
    });


    // app.use(logger);
    app.use(cors());
    app.use(cookieParser());
    app.use(express.json());

    app.use("/api/auth", authRouter);
    app.use("/api/contacts", contactsRouter);

    app.use(notFoundHandler);
    app.use(errorHandler);


  app.use(router);

  app.use('/uploads', express.static(UPLOAD_DIR));

  app.use('*', notFoundHandler);


    app.listen(port, () => console.log(`Server running on ${port} PORT`))
}

export default setupServer;
