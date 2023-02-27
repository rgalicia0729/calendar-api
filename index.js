const express = require('express');
require('dotenv').config();

const {dbConnection} = require('./database/config');

const PORT = process.env.PORT;
const app = express();

// DB Connection
(async function() {
    await dbConnection()
}())

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, () => {
    console.log(`Server listening on the port ${PORT}`);
});