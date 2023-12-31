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
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//Routes
// route::authentication::login || signup || logout
app.use('/api/auth', require('./routes/authRoutes.js'))
// route::user
app.use('/api/user', require('./routes/userRoutes.js'))
// route::file
app.use('/api/file', require('./routes/fileRoutes.js'))
// route::channel
app.use('/api/channel', require('./routes/channelRoutes.js'))
// route::video
app.use('/api/video', require('./routes/videoRoutes.js'))
// route::comment
app.use('/api/comment', require('./routes/commentRoutes.js'))

//connect to database
sequelize.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.log(err))

//syncing database
sequelize.sync({force: false})
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
        console.log('Database synced')
    })
    .catch(err => console.log(err))