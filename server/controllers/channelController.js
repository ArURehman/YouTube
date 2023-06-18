const createController = require('../utils/createController');
const { Channel, Video, User, Link } = require('../models');
const {randomKey} = require('../utils/randomKey');
const { putFile } = require('../utils/s3');
const { DateTime } = require('luxon');
const sequelize = require('../database');
const { QueryTypes } = require('sequelize')

module.exports.createChannelController = createController(
    async (req, res)  => {
        try{

            const date = DateTime.now().toISO()
            const key = 'banner/' + randomKey()
            
            const channel = await Channel.create({
                id: randomKey(),
                UserID: req.body.id,
                B_email: req.body.email,
                Description: req.body.description,
                Banner_Pic: key,
                createtdAt: date
            })

            //Uploading file to s3 bucket::/banner
            try{putFile(key, req.file.buffer)}
            catch(err){
                await Channel.destroy({where: {id: channel.id}})
                return res.status(500).send({message: "File Upload Error"})
            }

            res.status(201).send({message: "Channel Created Successfully"});
        }
        catch(err){
            res.status(500).send({message: err.message})
        }
    }
)

module.exports.getChannelStateController = createController(
    async (req, res) => {
        try{
            const user = await Channel.findOne({where: {UserID: req.body.id}})
            let hasChannel = false
            if(user) hasChannel = true

            res.status(200).send({hasChannel: hasChannel})
        }
        catch(err){
            res.status(500).send({message: err.message})
        }
    }
)

module.exports.getChannelFromUserController = createController(
    async (req, res) => {
        try{
            const channel = await Channel.findOne({where: {UserID: req.body.id}})
            res.status(200).send({channel: channel})
        }
        catch(err){
            res.status(500).send({message: err.message})
        }
    }
)

module.exports.getChannelController = createController(
    async (req, res) => {
        try{
            const channel = await Channel.findOne({where: {id: req.body.id}})
            
            const query = 'SELECT Users.* FROM Users INNER JOIN Channels ON Users.id = Channels.UserID WHERE Channels.id = :id'
            const user = await sequelize.query(query, {replacements: {id: req.body.id}, type: QueryTypes.SELECT})

            res.status(200).send({channel: channel, user: user[0]})
        }
        catch(err){
            res.status(500).send({message: err.message})
        }
    }
)

module.exports.uploadVideoController = createController(
    async (req, res) => {
        try{
            const vid_key = 'video/' + randomKey()
            const key = 'thumbnail/' + randomKey()
            
            const video = await Video.create({
                id: randomKey(),
                ChannelID: req.body.id,
                VideoTitle: req.body.title,
                VideoDescription: req.body.description,
                VideoFile: vid_key,
                VideoThumbnail: key,
                VideoVisibility: req.body.visibility,
                createdAt: DateTime.now().toISO()
            })

            //Uploading file to s3 bucket::/thumbnail
            try{putFile(key, req.files.image[0].buffer)}
            catch(err){
                await Video.destroy({where: {id: video.id}})
                return res.status(500).send({message: "Thumbnail Upload Error", error: err.message})
            }

            //Uploading file to s3 bucket::/video
            try{putFile(vid_key, req.files.video[0].buffer)}
            catch(err){
                await Video.destroy({where: {id: video.id}})
                return res.status(500).send({message: "Video Upload Error", error: err.message})
            }

            res.status(201).send({message: "Video Uploaded Successfully"});
        }
        catch(err){
            res.status(500).send({message: err.message})
        }
    }
)

module.exports.updateDescController = createController(
    async (req, res) => {
        try{
            const query = 'UPDATE Channels SET Description = :desc WHERE id = :id'
            await sequelize.query(query, {replacements: {desc: req.body.desc, id: req.body.id}}, {type: QueryTypes.UPDATE})
            res.status(200).send({message: "Description Updated Successfully"})
        }
        catch(err){
            res.status(500).send({message: err.message})
        }
    }
)

module.exports.updateEmailController = createController(
    async (req, res) => {
        try{
            const query = 'UPDATE Channels SET B_email = :email WHERE id = :id'
            await sequelize.query(query, {replacements: {email: req.body.email, id: req.body.id}}, {type: QueryTypes.UPDATE})
            res.status(200).send({message: "Email Updated Successfully"})
        }
        catch(err){
            res.status(500).send({message: err.message})
        }
    }
)

module.exports.subscriberCountController = createController(
    async (req, res) => {
        try{
            const query = 'SELECT COUNT(UserID) AS SubCount FROM Subscribers WHERE ChannelID = :id'
            const count = await sequelize.query(query, {replacements: {id: req.body.id}, type: QueryTypes.SELECT})
            res.status(200).send({count: count[0].SubCount})
        }
        catch(err){
            res.status(500).send({message: err.message})
        }
    }
)

module.exports.getVideoCountController = createController(
    async (req, res) => {   
        try{
            const query = 'SELECT COUNT(id) AS VideoCount FROM Videos WHERE ChannelID = :id'
            const count = await sequelize.query(query, {replacements: {id: req.body.id}, type: QueryTypes.SELECT})
            res.status(200).send({count: count[0].VideoCount})
        }
        catch(err){
            res.status(500).send({message: err.message})
        }
    }
)

module.exports.getLinksController = createController(
    async (req, res) => {
        try{

            const query = 'SELECT id, LinkName, Link FROM Links WHERE ChannelID = :id'
            const links = await sequelize.query(query, {replacements: {id: req.body.id}, type: QueryTypes.SELECT})
            res.status(200).send({links: links})

        }
        catch(err){
            res.status(500).send({message: err.message})
        }
    }
)

module.exports.addLinkController = createController(
    async (req, res) => {
        try{

            const link = await Link.create({
                ChannelID: req.body.id,
                Link: req.body.link,
                LinkName: req.body.name
            })

            res.status(201).send({message: "Link Added Successfully"})

        }
        catch(err){
            res.status(500).send({message: err.message})
        }
    }
)

module.exports.deleteLinkController = createController(
    async (req, res) => {
        try{

            await Link.destroy({where: {id: req.body.id}})
            res.status(200).send({message: "Link Deleted Successfully"})

        }
        catch(err){
            res.status(500).send({message: err.message})
        }
    }
)