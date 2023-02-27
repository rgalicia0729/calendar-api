const {User} = require('../models/User');

const login = (req, res) => {
    const {email, password} = req.body;

    return res.json({
        ok: true,
        message: 'Login',
        email,
        password,
    });
}

const createUser = async(req, res) => {
    try{
        const user = new User(req.body);
        await user.save();

        return res.json({
            ok: true,
            message: 'Create User',
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            message: 'Algo salio mal'
        });
    }
}

const renewToken = (req, res) => {
    res.send({
        ok: true,
        message: 'Renew token'
    });
}

module.exports = {
    login,
    createUser,
    renewToken,
}