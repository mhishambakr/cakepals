const { getBaker } = require("./Baker.service");


exports.getBakerDetails = async (req, res) => {
    try {
        let { id } = req.query;

        let query = {
            id
        };

        let baker = await getBaker({ query })

        res.status(200).json({
            message: 'Product list fetched successfully.',
            data: {
                baker
            }
        })
    } catch (err) {
        console.error(err);
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}