import config from 'config';
import jwt from 'jsonwebtoken';

module.exports = {

  getOTP() {
    var otp = Math.floor(100000 + Math.random() * 900000);
    return otp;
  },

  verifyToken: async (payload) => {
    var tokenData = await jwt.verify(payload, config.get('jwtSecret'));
    if (tokenData) {
      return tokenData._id;
    }
  },

  getToken: async (payload) => {
    var token = await jwt.sign(payload, config.get('jwtSecret'), { expiresIn: "3h", })
    return token;
  },

  getRefreshToken: async (payload) => {
    var token = await jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: '24h',
    });
    return token;
  },
};
