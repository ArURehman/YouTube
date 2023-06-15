const { S3 } = require('aws-sdk')
const config = require('../config/config')

module.exports.putFile = async (key, buffer) => {

    const s3 = new S3({})
    const params = {
        Bucket: config.s3.bucketName,
        Key: key,
        Body: buffer
    }
    return s3.putObject(params).promise();

}

module.exports.getFile = async (key) => {

    const s3 = new S3({})
    const params = {
        Bucket: config.s3.bucketName,
        Key: key
    }
    return s3.getObject(params).createReadStream();
}

module.exports.deleteFile = async (key) => {

    const s3 = new S3({})
    const params = {
        Bucket: config.s3.bucketName,
        Key: key
    }
    return s3.deleteObject(params).promise();
}