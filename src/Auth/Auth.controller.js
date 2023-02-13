const { createBaker } = require("../Baker/Baker.service");
const { findUserByUsername, createUser } = require("../User/User.service");
const { validatePassword, login } = require("./Auth.service");



exports.register = async (req, res) => {
    try {
        let { username, password: userPass, email, long, lat } = req.body;

        let { user } = await createUser({ username, userPass, email });

        let { baker } = await createBaker({ userId: user.id, long, lat })

        res.status(200).json({
            message: 'User registered successfully',
            data: {
                
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

        let { user } = await findUserByUsername({ username })

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