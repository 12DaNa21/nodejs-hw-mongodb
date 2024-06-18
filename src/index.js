import { config } from 'dotenv';
import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';
import { ContactsCollection } from './db/models/contact.js';


config();

export async function startServer() {
  await initMongoConnection();

 
  const contacts = await ContactsCollection.find();
  console.log('Contacts:', contacts);

  setupServer();
}

startServer();