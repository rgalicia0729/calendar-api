const bcrypt = require('bcryptjs');
const {User} = require('../models/User');
const {generateToken} = require('../helpers/jwt');

const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});

        if (!user) {
            return res.status(401).json({
                ok: false,
                message: 'Usuario no autorizado, credenciales no validas'
            });
        }

        const comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return res.status(401).json({
                ok: false,
                message: 'Usuario no autorizado, credenciales no validas'
            });
        }

        const token = await generateToken({
            uid: user.id,
            name: user.name,
        });

        return res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            message: 'Algo salio mal'
        });
    }
}

const createUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});

        if (user) {
            return res.status(400).json({
                ok: false,
                message: 'Ya existe un usuario registrado con ese correo'
            });
        }

        user = new User(req.body);

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        const token = await generateToken({
            uid: user.id,
            name: user.name,
        });

        return res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            message: 'Algo salio mal'
        });
    }
}

const renewToken = async (req, res) => {
    const {uid, name} = req;

    const token = await generateToken({uid, name});

    res.send({ok: true, uid, name, token});
}

module.exports = {
    login,
    createUser,
    renewToken,
}