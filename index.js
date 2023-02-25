const express = require('express');

const PORT = 4000;
const app = express();

app.get('/', (req, res) => {
    res.json({
        ok: true,
        message: 'Hola Mundo!!!'
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on the port ${PORT}`);
});