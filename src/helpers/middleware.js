module.exports = {
  validateId: (id, next) => {
    if(!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return
    }
    return next
  }
}