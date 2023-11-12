const { Client } = require('pg');
require("dotenv").config();


var client;

const connect = async() =>{
    const database = process.env.PGDATABASE;

    const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${database}`;


    client = new Client({
    connectionString,
    });
    await client.connect();
}


async function createTableVehicle() {
  try {  

    const query = `
      CREATE TABLE IF NOT EXISTS vehicle (
        id SERIAL PRIMARY KEY,
        name text,
        isValid boolean
      );
    `;

    await client.query(query);
    console.log('Table created successfully');
  } catch (error) {
    console.error('Error creating table:', error);
  } finally {
    await client.end();
  }
}

async function createTableDriver() {
  try {  

    const query = `
      CREATE TABLE IF NOT EXISTS driver (
        id SERIAL PRIMARY KEY,
        driverName text,
        isValid boolean
      );
    `;

    await client.query(query);
    console.log('Table created successfully');
  } catch (error) {
    console.error('Error creating table:', error);
  } finally {
    await client.end();
  }
}




connect()

// createTable();

createTableDriver()

