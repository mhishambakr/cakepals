const { User } = require("..");


exports.findUserByUsername = async ({username})=>{
    try {
        let user = await User.findOne({
            where: {
                username
            },
            raw: true
        });

        if (!user) {
            throw {
                status: 404,
                message: 'This username doesn\'t exist',
            }
        }

        return { user };
    } catch (err) {
        throw err;
    }
}