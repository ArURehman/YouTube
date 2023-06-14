const express = require('express')
const sql = require('sequelize')
const cors = require('cors')
const config = require('./config/config.js')

const port = config.app.port
const app = express()

//Middleware
app.use(cors());
app.use(express.json());

//Routes
// route::user
app.use('/api/user', require('./routes/userRoutes.js'))

//setting up sequelize
const sequelize = new sql.Sequelize(config.db)

//connecting to database
sequelize
    .authenticate()
    .then(() => {
        app.listen(port, () => {console.log('Listening at port: ' + port)})
        console.log('Connected to database')
    })
    .catch((err) => {
        console.log('Error while connecting to Database: ' + err)
    })

module.exports = sequelize