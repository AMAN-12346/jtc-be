import Joi from 'joi';
import _ from 'lodash';
import Config from 'config';
import commonFunction from '../../../../helper/util';
import { userServices } from '../../services/user';
import ApiResponse from '../../../../helper/apiResponse';
import responseMessage from '../../../../../config/responseMessage';
import ProductModel from '../../../../models/product';


/**
 * @export
 * @constant {any} userResult Getting an Object of user Info from Database.
 */

const { createUser, findUser, updateUser } = userServices;

export class userController {

  async registerProduct(req, res, next) {
    const validationSchema = {
      ownerName: Joi.string().required(),
      email: Joi.string().required(),
      phoneNo: Joi.string().required(),
      whatsAppNo: Joi.string().required(),
      category: Joi.string().required(),
      address: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      pincode: Joi.string().required(),
      companyName: Joi.string().required(),
      productDescription: Joi.string().required(),
      gstNumber: Joi.string().optional().allow(''),
      productImages: Joi.string().required(),
      bannerImage: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.body, validationSchema);
      const {
        ownerName,
        email,
        phoneNo,
        whatsAppNo,
        category,
        address,
        city,
        state,
        pincode,
        companyName,
        productDescription,
        gstNumber,
        productImages,
        bannerImage,
      } = validatedBody;
      var result;
      result = await ProductModel.create({
        ownerName,
        email,
        phoneNo,
        whatsAppNo,
        category,
        address,
        city,
        state,
        pincode,
        companyName,
        productDescription,
        gstNumber,
        productImages,
        bannerImage,
      });
      return res.json(
        ApiResponse.success(
          result ,
          responseMessage.SUCCESS
        )
      );
    } catch (error) {
      console.log('====', error);
      return next(error);
    }
  }
  async ProductList(req, res, next) {
    try {
      const Result = await ProductModel.find();
      if (!Result) {
        ApiResponse.notFound(responseMessage.NOT_FOUND);
      }
      return res.json(
        ApiResponse.success(Result, responseMessage.SUCCESS)
      );
    } catch (error) {
      console.log('====================================', error);
      next(error);
    }
  }
  async GetProductDetails(req, res, next) {
    try {
      const { id } = req.body._id;
      const Result = await ProductModel.findOne(id);
      if (!Result) {
        ApiResponse.notFound(responseMessage.NOT_FOUND);
      }
      return res.json(
        ApiResponse.success(Result , responseMessage.SUCCESS)
      );
    } catch (error) {
      console.log('====================================', error);
      next(error);
    }
  }
  async SearchBuisenessList(req, res, next) {
    try {
      const { category, city, address, companyName, productDescription } = req.query;
      const query = {};
      if (category) query.category = category;
      if (city) query.city = city;
      if (address) query.address = address;
      if (companyName) query.companyName = companyName;
      if (productDescription) query.productDescription = productDescription;
      const results = await ProductModel.find(query);
      if (!results) {
        ApiResponse.notFound(responseMessage.NOT_FOUND);
      } 
      return res.json(
        ApiResponse.success(results , responseMessage.SUCCESS)
      );
    } catch (err) {
      console.log('====================================', err);
      return next(err);
    }
  }
}

export default new userController();
