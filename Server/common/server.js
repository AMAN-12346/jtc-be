import express from "express";
import mongoose from "mongoose";
import * as http from "http";
import * as https from "https";
import * as path from "path";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import apiErrorHandler from '../helper/apiErrorHandler';
import userRouter from '../api/v1/controllers/user/routes';
const useragent = require('express-useragent');
import config from "config";
const app = express();
app.use(useragent.express());
const server = http.createServer(app);
const root = path.normalize(`${__dirname}/../..`);

class ExpressServer {
  constructor() {
    // const httpsAgent = new https.Agent({
    //   rejectUnauthorized: false
    // });

    app.use(express.json({ limit: '1000mb' }));
    app.use(express.urlencoded({ extended: true, limit: '1000mb' }));
    app.use(morgan('dev'));
    app.set('trust proxy', 1); // Trust first proxy
    // app.use((req, res, next) => {
    //   req.httpsAgent = httpsAgent;
    //   next();
    // });

    app.use(cors({
      allowedHeaders: ["Content-Type", "token", "authorization"],
      exposedHeaders: ["token", "authorization"],
      origin: ["*"],
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
      preflightContinue: false,
    }));
    this.configureSwagger(config.get("swaggerDefinition"));
  }

  router(routes) {
    routes(app);
    app.use("/", userRouter);
    return this;
  }


  configureSwagger(swaggerDefinition) {
    const options = {
      swaggerDefinition,
      apis: [path.resolve(`${root}/server/api/v1/controllers/**/*.js`), path.resolve(`${root}/api.yaml`)],
    };

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));
    return this;
  }

  handleError() {
    app.use(apiErrorHandler);
    return this;
  }

  configureDb(dbUrl) {
    return new Promise((resolve, reject) => {
      mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) {
          console.log(`Error in MongoDB connection: ${err.message}`);
          return reject(err);
        }
        console.log("MongoDB connection established🌍🌏");
        return resolve(this);
      });
    });
  }

  listen(port) {
    server.listen(port, () => {
      console.log(`Server is running on port: ${port}`, new Date().toLocaleString());
    });
    return app;
  }
}

export default ExpressServer;
