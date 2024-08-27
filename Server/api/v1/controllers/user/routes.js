import express from 'express';
import controller from './controller';
import upload from '../../../../helper/uploadHandler';

const router = express.Router();

router.post("/register-Product", controller.registerProduct);
router.get("/Product-list", controller.ProductList);
router.get("/GetProduct-Details", controller.GetProductDetails);
router.get("/search-buiseness", controller.SearchBuisenessList);
export default router;
