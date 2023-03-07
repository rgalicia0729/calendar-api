const mongoose = require('mongoose');

const dbConnection = async() => {
    try{
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URL);

        console.log('DB online');
    }catch (err) {
        console.error(err);
        throw new Error('Error al conectarse con la base de datos');
    }
}

module.exports = {
    dbConnection
}