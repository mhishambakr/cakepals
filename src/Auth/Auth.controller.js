const { findUserByUsername } = require("../User/User.service");
const { register, validatePassword, login } = require("./Auth.service");



exports.register = async (req, res) => {
    try {
        let data = await register(req.body);

        res.status(200).json({
            message: 'User registered successfully',
            data
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
            data
        })
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}