const multer = require('multer')
const crypto = require('crypto')
const path = require('path')

module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
        filename: (req, file, callback) => {
            crypto.randomBytes(16, (error, result) => {
                if (error) {
                    return callback(error)
                }

                return callback(null, result.toString('hex') + path.extname(file.originalname))
            })
        }

    })
}

