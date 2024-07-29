import express from 'express';
import controller from './controller';
import upload from '../../../../helper/uploadHandler';

const router = express.Router();

router.post("/contact-us", controller.contactUs);
export default router;
