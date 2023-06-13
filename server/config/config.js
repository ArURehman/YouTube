require("dotenv").config()

const config = {
    app:{
        port: process.env.PORT || 3000,
        JWT_SECRET: process.env.JWT_SECRET
    },
    db:{
        user: process.env.USER,
        password: process.env.PASSWORD,
        server: process.env.SERVER,
        database: process.env.DATABASE,
        options: {
            encrypt: false
        }
    },
    s3:{
        bucketName: process.env.AWS_BUCKET_NAME
    }
}

module.exports = config