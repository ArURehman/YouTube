const express = require('express')
const cors = require('cors')
const config = require('./config/config.js')
const cookieParser = require('cookie-parser')
const sequelize = require('./database.js')

const port = config.app.port
const app = express()

//Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Routes
// route::authentication::login || signup
app.use('/api/auth', require('./routes/authRoutes.js'))

//connect to database
sequelize.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.log(err))

//syncing database
sequelize.sync({force: true})
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
        console.log('Database synced')
    })
    .catch(err => console.log(err))