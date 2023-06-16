const createController = require('../utils/createController');
const { User } = require('../models');
const config = require('../config/config')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { putFile } = require('../utils/s3');
const { Op } = require('sequelize');
const { DateTime } = require('luxon');
const { randomKey } = require('../utils/randomKey');

module.exports.signupController = createController(
    async (req, res) => {
        
        try{
            //Hashing password
            const hashedPassword = await bcrypt.hash(req.body.password, 10)

            //Adding User to database
            const date = DateTime.now().toISO()
            const key = 'profile/' + randomKey()

            const result = await User.create({
                Email: req.body.email,
                id: randomKey(),
                UserName: req.body.username,
                Password: hashedPassword,
                Profile_Pic: key,
                Created_At: date,
                Notif_Check_At: null
            })

            //Uploading file to s3 bucket::/profile_pic
            try{putFile(key, req.file.buffer)}
            catch(err){
                await User.destroy({where: {id: result.id}})
                return res.status(500).send({message: "File Upload Error"})
            }

            res.status(201).send({message: "User Created Successfully"});

        }
        catch(err){
            res.status(500).send({message: err.message})
        }
    }
)

module.exports.loginController = createController(
    async (req, res) => {
        try{
            //Checking if user exists
            const result = await User.findOne({where: {Email: req.body.email}})

            if(result === null){
                return res.status(401).send({message: "Invalid Credentials"})
            }

            //Checking if password is correct
            if(await bcrypt.compare(req.body.password, result.Password)){
                //Creating token
                const token = jwt.sign(
                    {id: result.id},
                    config.app.JWT_SECRET, 
                    {expiresIn: '24h'}
                )
                //Sending back token as cookie
                res.cookie('jwt', token, {httpOnly: true, maxAge: 24*60*60*1000})
                res.send({message: "User Authenticated Successfully"})
            }
            else{
                return res.status(401).send({message: "Invalid Credentials"})
            }
        }
        catch(err){
            res.status(500).send({message: err.message})
        }
    }
)

module.exports.infoController = createController(
    async (req, res) => {
        try{
            const cookie = req.cookies['jwt']
            const claims = jwt.verify(cookie, config.app.JWT_SECRET)

            if(!claims){
                return res.status(401).send({message: "Not Authenticated"})
            }

            const result = await User.findOne({where: {id: claims.id}})

            const {Password, ...user} = await result.toJSON()
            res.status(200).send({message: "User Authenticated Successfully", user: user})
        }
        catch(err){
            res.status(500).send({message: err.message})
        }
    }
)

module.exports.logoutController = createController(
    async (req, res) => {
        try{
            res.clearCookie('jwt')
            res.status(200).send({message: "Logout Successful"})
        }
        catch(err){
            res.status(500).send({message: err.message})
        }
    }
)