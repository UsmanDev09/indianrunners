import { NextFunction, Request, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";
import passport from "passport";
import cors from "cors";
import express from "express";

import userRoutes from "../routes/user";
import activityRoutes from "../routes/activity";
import challengeRoutes from "../routes/challenge";
import challengeCategoryRoutes from "../routes/challengeCategory";
import productCategoryRoutes from "../routes/productCategory";
import { Constants } from "./constants";
import productRoutes from "../routes/product";
import badgeRoutes from "../routes/badge";
import cartRoutes from "../routes/cart";
import shippingDetailRoutes from "../routes/shippingDetails";
import notificationRoutes from "../routes/notification";
import orderSummaryRoutes from "../routes/orderSummary";
import paymentRoutes from "../routes/payment";
import swaggerDocs from "./swagger";
import leaderboardRoutes from "../routes/leaderboard";
import inventoryRoutes from "../routes/inventory";
import landingPageRoutes from "../routes/landingPage";
import checkoutRoutes from "../routes/checkout";
import env from "./validateEnv";

// var bodyParser = require("body-parser");

const app = express();

const server = () => {
    app.use(express.json({limit: '50mb'}));
    app.use(express.urlencoded( {limit: '50mb', extended: false} ))
    app.use(express.urlencoded());
    app.use(cors({
        origin: env.CLIENT_DOMAIN
    }))
    app.use(passport.initialize())
    // app.use(whitelistRequestBodyParams)
 
    app.use('/api/user', userRoutes)
    app.use('/api/activity', activityRoutes)
    app.use('/api/challengeCategory', challengeCategoryRoutes)
    app.use('/api/challenge', challengeRoutes)
    app.use('/api/product', productRoutes)
    app.use('/api/inventory', inventoryRoutes)
    app.use('/api/badge', badgeRoutes)
    app.use('/api/cart', cartRoutes)
    app.use('/api/shippingDetails', shippingDetailRoutes)
    app.use('/api/orderSummary', orderSummaryRoutes)
    app.use('/api/product/category', productCategoryRoutes)
    app.use('/api/payment', paymentRoutes)
    app.use('/api/notification', notificationRoutes)
    app.use('/api/leaderboard', leaderboardRoutes)
    app.use('/api/landingpage', landingPageRoutes)
    app.use('/api/checkout', checkoutRoutes)

    swaggerDocs(app, 5000);

    app.get("/");
    // no endpoint
    app.use((req, res, next) => {
      next(createHttpError(404, Constants.routeNotFound));
    });
  
    // error handler
    app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
      let errorMessage = "An unknown error occured.";
      let statusCode = 500;
      if (isHttpError(error)) {
        errorMessage = error.message;
        statusCode = error.status;
      }
      res.status(statusCode).json({
        success: false,
        message: error,
      });
    });
    return app; 
};

export default server;
