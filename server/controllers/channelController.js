const createController = require('../utils/createController');
const { Channel } = require('../models');
const {randomKey} = require('../utils/randomKey');
const { putFile } = require('../utils/s3');
const { DateTime } = require('luxon');

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