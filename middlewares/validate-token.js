const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            message: 'Usuario no autorizado',
        });
    }

    try {
        const {uid, name} = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.uid = uid;
        req.name = name;

        next();
    } catch (err) {
        return res.status(401).json({
            ok: false,
            message: 'Usuario no autorizado',
        });
    }
}

module.exports = {
    validateToken
}