const axios = require('axios');
const Dev = require('../models/Dev');
const parseStrigAsArray = require('../utils/parseStringAsArray');

module.exports = {

    
    // Show all devs
    async index(req, res){
        const devs = await Dev.find();

        return res.json(devs);
    },


    // Register Devs
    async store (req, res){
        const { github_username, techs, latitude, longitude } = req.body;
        let dev = await Dev.findOne({github_username});
        if(!dev){
                    // wait the response of GitHub
            const apiRes = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, avatar_url, bio } = apiRes.data;
            const techsArray = parseStrigAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        }

        return res.json(dev);
    }
};