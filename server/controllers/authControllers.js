const createController = require('../utils/createController');
const { User } = require('../models');
const config = require('../config/config')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const crypto = require('node:crypto');
const { getFile, putFile, deleteFile } = require('../utils/s3');
const { DateTime } = require('luxon')

const randomKey = () => {return crypto.randomBytes(32).toString('hex')}

module.exports.signupController = createController(
    async (req, res) => {
        
        try{
            
            console.log(req.body)
            console.log(req.file)

            //Check if User is existing user
            const existingUser = await User.findOne({where: { Email: req.body.email }})
            if(existingUser){
                return res.status(400).send({message: "User already exists"})
            }

            //Hashing password
            const hashedPassword = await bcrypt.hash(req.body.password, 10)

            //Uploading file to s3 bucket::/profile_pic
            const key = 'profile/' + randomKey()
            try{putFile(key, req.file.buffer)}
            catch(err){return res.status(500).send({message: "File Upload Error"})}

            //Adding User to database
            const date = DateTime.now().toISO()

            const result = await User.create({
                Email: req.body.email,
                UserID: randomKey(),
                UserName: req.body.username,
                Password: hashedPassword,
                Profile_Pic: key,
                Created_At: date,
                Notif_Check_At: null
            })

            //Creating and Sending JWT
            const token = jwt.sign({email: result.Email, id: result.UserID}, config.app.JWT_SECRET)
            res.status(201).send({user: result, token: token});

        }
        catch(err){
            res.status(500).send({message: err.message})
        }
    }
)