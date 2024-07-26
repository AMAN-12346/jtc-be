import Joi from "joi";
import _ from "lodash";
import Config from "config";
import commonFunction from "../../../../helper/util";
import { userServices } from '../../services/user';
import ApiResponse from "../../../../helper/apiResponse";
import responseMessage from "../../../../../config/responseMessage";
import userType from "../../../../enums/userType";
import ProductSchema from "../../../../models/product";

/**
 * @export
 * @constant {any} userResult Getting an Object of user Info from Database.
 */

const {
  createUser,
  findUser,
  updateUser,
} = userServices;

export class userController {
  async register(req, res, next) {
    const validationSchema = {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      mobileNumber: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.body, validationSchema)
      const { firstName, lastName, email, password, mobileNumber } = validatedBody
      var result
      var token
      const userExist = await findUser({
        $or: [
          { email },
          { mobileNumber }
        ]
      });
      if (userExist) {
        if (userExist.email === email) {
          return res.json(ApiResponse.conflict({}, responseMessage.EMAIL_EXIST))
        }
        if (userExist.mobileNumber === mobileNumber) {
          return res.json(ApiResponse.conflict({}, responseMessage.MOBILE_EXIST))
        }
      }
      result = await createUser({
        firstName, lastName, email, password, mobileNumber,
        userType: userType.USER
      });
      token = await commonFunction.getToken({result})
      res.cookie('token', token, {
        httpOnly: Config.get('cookieOption.httpOnly'),
        secure: Config.get('cookieOption.secure'),
        maxAge: Config.get('cookieOption.maxAge')
      });
      return res.json(ApiResponse.success({token}, responseMessage.USER_CREATED))
    } catch (error) {
      return next(error);
    }
  }
}

export default new userController();
