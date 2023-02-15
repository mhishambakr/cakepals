const { getBaker, calculateBakerRating } = require("./Baker.service");


exports.getBakerDetails = async (req, res) => {
    try {
        let { id } = req.query;

        let query = {
            id
        };

        let [baker, rating] = await Promise.all([
            getBaker({ query }),
            calculateBakerRating({ BakerId: id })
        ])

        res.status(200).json({
            message: 'Baker details fetched successfully.',
            data: {
                baker: {
                    ...baker,
                    rating
                },
            }
        })
    } catch (err) {
        console.error(err);
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}