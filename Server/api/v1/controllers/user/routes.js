import express from 'express';
import controller from './controller';
import upload from '../../../../helper/uploadHandler';

const router = express.Router();

router.post("/register", controller.register);

export default router;
