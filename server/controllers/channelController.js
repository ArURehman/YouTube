const createController = require('../utils/createController');
const { Channel } = require('../models');
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