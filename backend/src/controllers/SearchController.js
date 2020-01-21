const Dev = require('../models/Dev');
const parseStrigAsArray = require('../utils/parseStringAsArray');


module.exports = {
    async index (req, res) {
        // Find devs in 10km
        const{ latitude, longitude, techs } = req.query;

        const techsArray = parseStrigAsArray(techs);

        const devs = await Dev.find({
            // Filter to find devs with the techs
            techs: {
                $in:techsArray,
            },
            location: {
                $near:{
                    $geometry:{
                        type: 'Point',
                        coordinates: [ longitude, latitude],
                    },
                    $maxdistance: 10000,
                },
            },
        });
        
        return res.json({ devs });
    }
}