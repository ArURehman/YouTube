const createController = require('../utils/createController');
const { Subscriber, User, Channel, Video, Tag } = require('../models');
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

module.exports.postTagsController = createController(
    async (req, res) => {
        try{
            const query = 'INSERT INTO Tags (VideoID, TagText) VALUES (:VideoID, :TagText)'
            for (let i = 0; i < req.body.tags.length; i++) {
                await sequelize.query(query, {replacements: {VideoID: req.body.id, TagText: req.body.tags[i]}})
            }
            res.status(200).json({message: "Tags added successfully"})
        }
        catch(err){
            res.status(500).json({message: err.message})
        }
    }
)

module.exports.getPlayingVideoController = createController(
    async (req, res) => {
        try{
            const query = 'SELECT Videos.VideoDescription, Videos.VideoTitle, Videos.VideoFile, Videos.createdAt, Channels.id AS ChannelID, Users.id AS UserID, Users.UserName, Users.Profile_Pic FROM Videos INNER JOIN Channels ON Videos.ChannelID = Channels.id INNER JOIN Users ON Users.id = Channels.UserID WHERE Videos.id = :id'
            const video = await sequelize.query(query, {replacements: {id: req.body.id}, type: QueryTypes.SELECT})
            res.status(200).json({video: video})
        }
        catch(err){
            res.status(500).json({message: err.message})
        }
    }
)