const Attachment = require('../models/Attachment')

module.exports = {
  async create(req, res) {
    const { originalname, filename } = req.file

    const attachment = await Attachment.create({
     nome: originalname,
    file: filename })
    return res.json(attachment)
  },
}
