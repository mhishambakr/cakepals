const { createBaker } = require("../Baker/Baker.service");
const { findUser, createUser } = require("../User/User.service");
const { validatePassword, login } = require("./Auth.service");



exports.register = async (req, res) => {
    try {
        let { name, username, password, email, role, coordinates } = req.body;

        let { user } = await createUser({ name, username, password, email, role, coordinates })

        res.status(200).json({
            message: 'User registered successfully',
            data: {
                user
            }
        })
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}

exports.login = async (req, res) => {
    try {
        let { username, password } = req.body;

        let { user } = await findUser({ query: { username } })

        await validatePassword({ actualPassword: user.password, password })

        let data = await login({ userId: user.id });

        res.status(200).json({
            message: 'Logged in successfully',
            data: {
                ...data
            }
        })
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}