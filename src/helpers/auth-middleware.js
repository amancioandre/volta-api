
const bcrypt = require('bcryptjs');
const User = require('../../models/user');

function authenticate(user, password) {
  if (user && bcrypt.compareSync(password, user.password)) {
    return true;
  } return false;
}

async function createPassword(userParam) {
  console.log(userParam);
  if (await User.findOne({ username: userParam.username })) {
    return { message: `Username "${userParam.username}" is already taken` };
  }

  // hash password
  if (userParam.password) {
    userParam.hash = bcrypt.hashSync(userParam.password, 10);
    return userParam.hash;
  } return { message: 'Invalid Password' };
}

function checkIfIsLogged(req, res, next) {
  return req.session.user ? next : res.status(401).json({ message: 'user is not logged' });
}

module.exports = {
  authenticate,
  createPassword,
  checkIfIsLogged,
};
