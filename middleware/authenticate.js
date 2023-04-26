const jwt = require('jsonwebtoken');
const Users = require('../Models/userSchema');

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const verifyToken = jwt.verify(token, 'VhQ5koGsor4b6xoWcm3ZFbhP8jT2Rbal');

    const user = await Users.findOne({ _id: verifyToken._id });
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    req.user = null;
    next();
  }
};

module.exports = authenticate;
