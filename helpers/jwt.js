const jwt = require('jsonwebtoken');

const generateToken = ({uid, name}) => {
    return new Promise((resolve, reject) => {
        const payload = {uid, name};

        jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: '2h'
        }, (err, token) => {
           if (err) {
               console.error(err);
               reject('Error al generar JWT');
           }

           resolve(token);
        });
    });
}

module.exports = {
    generateToken
}