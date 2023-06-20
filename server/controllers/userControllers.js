const createController = require('../utils/createController');
const { Subscriber } = require('../models');
const { DateTime } = require('luxon');
const sequelize = require('../database')
const { QueryTypes } = require('sequelize');

module.exports.subscribeStatusController = createController(
    async (req, res) => {
        try {
            const query = 'SELECT * FROM Subscribers WHERE UserID = :UserID AND ChannelID = :ChannelID'
            const subscriber = await sequelize.query(query, {replacements: {UserID: req.body.UserID, ChannelID: req.body.ChannelID}, type: QueryTypes.SELECT});
            console.log(subscriber)
            if (subscriber.length === 0) {
                return res.status(200).json({ message: "Subscribed", status : false });
            }
            return res.status(200).json({ message: "Already subscribed", status : true });

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
);

module.exports.subscribeController = createController(
    async (req, res) => {
        try {
            const subscriber = await Subscriber.create({
                UserID: req.body.UserID,
                ChannelID: req.body.ChannelID,
                Subbed_At: DateTime.now().toISO(),
            });
            res.status(200).json({ message: "Subscribed", status : true });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
);

module.exports.unsubscribeController = createController(
    async (req, res) => {
        try {
            const subscriber = await Subscriber.destroy({
                where: {
                    UserID: req.body.UserID,
                    ChannelID: req.body.ChannelID,
                }
            });
            res.status(200).json({ message: "Unsubscribed", status : false });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
);

module.exports.addHistoryController = createController(
    async (req, res) => {
        try{
            const query = 'INSERT INTO History (UserID, VideoID, Watched_At) VALUES (:UserID, :VideoID, :WatchedAt)'
            await sequelize.query(query, {replacements: {UserID: req.body.UserID, VideoID: req.body.VideoID, WatchedAt: DateTime.now().toISO()}, type: QueryTypes.INSERT});
            res.status(200).json({ message: "Added to history" });
        }
        catch(err){
            res.status(500).json({ message: err.message });
        }
    }
);