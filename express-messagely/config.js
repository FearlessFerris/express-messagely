// Messagely Config 

// read .env files and make environmental variables
require("dotenv").config();

const DB_URI = (process.env.NODE_ENV === "test")
  ? {
    user: 'marcus',
    host: 'localhost', 
    database: 'messagely_test',
    port: 5432
  }
  : 
  {
    user: 'marcus',
    password: 'Civil392601*',
    host: 'localhost',
    database: 'messagely',
    port: 5432
  }

const SECRET_KEY = process.env.SECRET_KEY || "secret";

const SALT = 12;


module.exports = {
  DB_URI,
  SECRET_KEY,
  SALT,
};