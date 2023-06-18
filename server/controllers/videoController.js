const createController = require('../utils/createController');
const { Subscriber, User, Channel, Video } = require('../models');
const { DateTime } = require('luxon');
const { QueryTypes } = require('sequelize');
const sequelize = require('../database.js');

module.exports.getVideosController = createController(
    async (req, res) => {
        try{
            const query = 'SELECT Videos.id, Videos.VideoFile, Videos.VideoThumbnail, Videos.VideoTitle, Videos.VideoVisibility, Videos.createdAt, Channels.id AS ChannelID, Users.id AS UserID, Users.UserName, Users.Profile_Pic FROM Videos INNER JOIN Channels ON Videos.ChannelID = Channels.id INNER JOIN Users ON Users.id = Channels.UserID'
            const videos = await sequelize.query(query, {type: QueryTypes.SELECT})
            res.status(200).json({videos: videos})
        }
        catch(err){
            res.status(500).json({message: err.message})
        }
    }
)