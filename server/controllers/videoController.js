const createController = require('../utils/createController');
const { Video_Reaction } = require('../models');
const { QueryTypes } = require('sequelize');
const { DateTime } = require('luxon');
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

module.exports.postReactionController = createController(
    async (req, res) => {
        try{
            const query = 'INSERT INTO VideoReactions (VideoID, UserID, Reaction, Reaction_At) VALUES (:VideoID, :UserID, :Reaction, :Reaction_At)'
            const reaction = await sequelize.query(query, {replacements: {VideoID: req.body.VideoID, UserID: req.body.UserID, Reaction: req.body.Reaction, Reaction_At: DateTime.now().toISO()}, type: QueryTypes.INSERT})
            res.status(200).json({message: "Reaction added successfully"})
        }
        catch(err){
            res.status(500).json({message: err.message})
        }
    }
)

module.exports.getReactionCountController = createController(
    async (req, res) => {
        try{
            const query = 'SELECT COUNT(UserID) AS ReactionCount FROM VideoReactions WHERE VideoID = :VideoID AND Reaction = :Reaction'
            const reactionCount = await sequelize.query(query, {replacements: {VideoID: req.body.VideoID, Reaction: req.body.Reaction}, type: QueryTypes.SELECT})
            res.status(200).json({count: reactionCount})
        }
        catch(err){
            res.status(500).json({message: err.message})
        }
    }
)

module.exports.postIncreaseViewsController = createController(
    async (req, res) => {
        try{
            const query = 'UPDATE Videos SET VideoViews = VideoViews + 1 WHERE id = :id'
            const increaseViews = await sequelize.query(query, {replacements: {id: req.body.id}, type: QueryTypes.UPDATE})
            res.status(200).json({message: "Views increased successfully"})
        }
        catch(err){
            res.status(500).json({message: err.message})
        }
    }
)