const login = (req, res) => {
    res.json({
        ok: true,
        message: 'Login'
    });
}

const createUser = (req, res) => {
    res.json({
        ok: true,
        message: 'Create User'
    });
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