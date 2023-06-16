const createController = require('../utils/createController');
const { getFile } = require('../utils/s3');

module.exports.get = createController(
    async (req, res) => {
        try{
            const re = `${req.params.folderName}/${req.params.key}`
            const readStream = await getFile(re)
            readStream.pipe(res)
        }
        catch(err){
            res.status(500).send({message: err.message})
        }
    }
)