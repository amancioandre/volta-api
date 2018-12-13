const mongoose = require('mongoose');

module.exports = {
  validateId: (id, req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return
    }
    return next
  }
}