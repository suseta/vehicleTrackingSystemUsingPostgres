
const { Client } = require('pg');

const connect = async () => {
    const database = process.env.PGDATABASE;

    const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${database}`;

    const client = new Client({
        connectionString,
    });

    await client.connect();
    return client;
}

const getClient = async () => {
    const client = await connect();
    return client;
}

module.exports = {
    connect,
    getClient
}
