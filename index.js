const express = require('express');
const cors = require('cors');
require('dotenv').config();

const {dbConnection} = require('./database/config');

const PORT = process.env.PORT;
const app = express();

// DB Connection
(async function() {
    await dbConnection()
}())

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

app.listen(PORT, () => {
    console.log(`Server listening on the port ${PORT}`);
});