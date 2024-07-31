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
      companyName: Joi.string().optional().allow(''),
      websiteUrl: Joi.string().optional().allow(''),
      expectedTime: Joi.string().optional().allow(''),
      projectPhase: Joi.string().optional().allow(''),
      message: Joi.string().optional().allow(''),
      budget: Joi.string().optional().allow(''),
    };
    try {
      const validatedBody = await Joi.validate(req.body, validationSchema);
      const {
        intrestedIn,
        fullName,
        email,
        companyName,
        websiteUrl,
        expectedTime,
        projectPhase,
        budget,
        message,
      } = validatedBody;
      var result;
      await commonFunction.sendMail(email)
      result = await createUser({
        intrestedIn,
        fullName,
        email,
        companyName,
        websiteUrl,
        expectedTime,
        projectPhase,
        budget,
        message,
      });
      return res.json(
        ApiResponse.success({ result }, responseMessage.REQ_SUBMIT)
      );
    } catch (error) {
      console.log('====================================',error);
      return next(error);
    }
  }
}

export default new userController();
