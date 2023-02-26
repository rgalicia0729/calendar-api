const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT;
const app = express();

// Routes
app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, () => {
    console.log(`Server listening on the port ${PORT}`);
});