require("dotenv").config()

const config = {
    app:{
        port: process.env.PORT || 4000,
        JWT_SECRET: process.env.JWT_SECRET
    },
    db:{
        dialect: "mssql",
        host: process.env.SERVER,
        username: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    },
    s3:{
        bucketName: process.env.AWS_BUCKET_NAME
    }
}

module.exports = config