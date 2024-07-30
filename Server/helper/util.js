import config from 'config';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

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
  sendMail(email) {
    return new Promise((resolve, reject) => {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.emailAuth.user,
          pass: config.emailAuth.pass,
        },
      });
      var mailOption = {
        from: '<moondiveco@gmail.com>',
        to: email,
        subject: 'MoonDive account verification',
        html:`
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto;">
                <tr>
                    <td style="padding: 20px 0; text-align: center; background-color: #018191;">
                        <h1 style="color: #fff;">Moondive</h1>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px; background-color: #fff;">
                        <p>Thank you for contacting Moondive.</p>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px; background-color: #018191; text-align: center;">
                        <p style="color: #fff;">&copy; 2024 MoonDive</p>
                    </td>
                </tr>
            </table>    
        </body>
        `,
      };
      transporter.sendMail(mailOption, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  },
};
