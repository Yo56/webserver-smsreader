import express from "express";
import passport from "passport";

import homePageController from "../controllers/homePageController";
import loginController from "../controllers/loginController";
import apiController from "../controllers/apiController";
import auth from "../validation/authValidation";
import initPassportLocal from "../controllers/passportLocalController";

let router = express.Router();

initPassportLocal();

const api = '/api/v1';

let initWebRoutes = (app) => {
    router.get("/", loginController.checkLoggedIn, homePageController.handleHelloWorld);
    router.get("/login",loginController.checkLoggedOut, loginController.getPageLogin);
    router.post("/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }));

    //API endpoints
    router.post(api+"/message",apiController.postMessage);
    router.get(api+'/message', loginController.checkLoggedIn ,apiController.getAllMessages);
    router.post(api+'/hash',loginController.hashPassword);
    router.post(api+'/card',apiController.postCard);

    router.post("/logout", loginController.postLogOut);
    return app.use("/", router);
};
module.exports = initWebRoutes;
