import { Account, Client, Databases } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66a04f3d0015f3e7103a'); 

const account = new Account(client);
const database = new Databases(client);

export { client, account, database };
