const createController = require('../utils/createController');
const { Subscriber } = require('../models');
const { DateTime } = require('luxon');

module.exports.subscribeStatusController = createController(
    async (req, res) => {
        try {
            const { UserID, ChannelID } = req.body;
            const subscriber = await Subscriber.findOne({ where: { UserID, ChannelID } });
            if (subscriber) {
                return res.status(200).json({ message: "Already subscribed", status : true });
            }
            else{
                return res.status(200).json({ message: "Subscribed", status : false });
            }

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
);

module.exports.toggleSubscriberController = createController(
    async (req, res) => {
        try {
            const { UserID, ChannelID } = req.body;
            const subscriber = await Subscriber.findOne({ where: { UserID, ChannelID } });
            if (subscriber) {
                await subscriber.destroy();
                return res.status(200).json({ message: "Unsubscribed" });
            }
            else{
                await Subscriber.create({ 
                    UserID: UserID, 
                    ChannelID: ChannelID, 
                    Subbed_At: DateTime.now().toISO()
                });
                return res.status(200).json({ message: "Subscribed" });
            }

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
);