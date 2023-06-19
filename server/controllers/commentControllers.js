const createController = require('../utils/createController');
const {randomKey} = require('../utils/randomKey');
const { Video, User, Comment } = require('../models');
const { DateTime } = require('luxon');
const sequelize = require('../database');
const { QueryTypes } = require('sequelize');

module.exports.postCommentController = createController(
    async (req, res) => {
        try{
            const comment = await Comment.create({
                id: randomKey(),
                Parent_ComID: req.body.parentCommentID,
                Com_Text: req.body.commentText,
                VideoID: req.body.VideoID,
                UserID: req.body.UserID,
                createdAt: DateTime.now().toISO(),
                updatedAt: DateTime.now().toISO()
            });
            res.status(200).json({comment: comment});
        }
        catch(err){
            res.status(500).json({message: err.message});
        }
    }
);

module.exports.getCommentController = createController(
    async (req, res) => {
        try{
            const query = 'SELECT Comments.*, Users.UserName, Users.Profile_Pic FROM Comments INNER JOIN Users ON Comments.UserID = Users.id WHERE Comments.VideoID = :VideoID AND Comments.Parent_ComID IS NULL ORDER BY Comments.createdAt DESC';
            const comments = await sequelize.query(query, {replacements: {VideoID: req.body.VideoID}, type: QueryTypes.SELECT});

            res.status(200).json({comments: comments});
        }
        catch(err){
            res.status(500).json({message: err.message});
        }
    }   
);

module.exports.countCommentsController = createController(
    async (req, res) => {
        try{
            
            const query = 'SELECT COUNT(id) AS count FROM Comments WHERE VideoID = :VideoID';
            const count = await sequelize.query(query, {replacements: {VideoID: req.body.VideoID}, type: QueryTypes.SELECT});
            res.status(200).json({count: count[0].count});
        }
        catch(err){
            res.status(500).json({message: err.message});
        }
    }
);

module.exports.countRepliesController = createController(
    async (req, res) => {
        try{
            const query = 'SELECT COUNT(id) AS count FROM Comments WHERE Parent_ComID = :Parent_ComID AND VideoID = :VideoID';
            const count = await sequelize.query(query, {replacements: {Parent_ComID: req.body.parentCommentID, VideoID: req.body.VideoID}, type: QueryTypes.SELECT});
            res.status(200).json({count: count[0].count});
        }
        catch(err){
            res.status(500).json({message: err.message});
        }
    }
);

module.exports.getRepliesController = createController(
    async (req, res) => {
        try{
            const query = 'SELECT Comments.*, Users.UserName, Users.Profile_Pic FROM Comments INNER JOIN Users ON Comments.UserID = Users.id WHERE Comments.Parent_ComID = :Parent_ComID AND VideoID = :VideoID ORDER BY Comments.createdAt DESC'
            const replies = await sequelize.query(query, {replacements: {Parent_ComID: req.body.parentCommentID, VideoID: req.body.VideoID}, type: QueryTypes.SELECT});
            res.status(200).json({replies: replies});
        }
        catch(err){
            res.status(500).json({message: err.message});
        }
    }
);