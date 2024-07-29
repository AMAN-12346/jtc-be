import Joi from 'joi';
import _ from 'lodash';
import Config from 'config';
import commonFunction from '../../../../helper/util';
import { userServices } from '../../services/user';
import ApiResponse from '../../../../helper/apiResponse';
import responseMessage from '../../../../../config/responseMessage';
import userType from '../../../../enums/userType';
import ProductSchema from '../../../../models/product';

/**
 * @export
 * @constant {any} userResult Getting an Object of user Info from Database.
 */

const { createUser, findUser, updateUser } = userServices;

export class userController {

  async contactUs(req, res, next) {
    const validationSchema = {
      intrestedIn: Joi.string().required(),
      fullName: Joi.string().required(),
      email: Joi.string().required(),
      companyName: Joi.string().required(),
      companyCountry: Joi.string().required(),
      websiteUrl: Joi.string().optional(),
      expectedTime: Joi.string().optional(),
      projectPhase: Joi.string().optional(),
      message: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.body, validationSchema);
      const {
        intrestedIn,
        fullName,
        email,
        companyName,
        companyCountry,
        websiteUrl,
        expectedTime,
        projectPhase,
        message,
      } = validatedBody;
      var result;
      await commonFunction.sendMail(email)
      result = await createUser({
        intrestedIn,
        fullName,
        email,
        companyName,
        companyCountry,
        websiteUrl,
        expectedTime,
        projectPhase,
        message,
      });
      return res.json(
        ApiResponse.success({ result }, responseMessage.REQ_SUBMIT)
      );
    } catch (error) {
      return next(error);
    }
  }
}

export default new userController();
