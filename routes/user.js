// Import Express framework to build web server and routes
const express = require("express");
const router = express.Router(); // router object
const User = require("../models/user.js");
// Import wrapper function for handling async route errors automatically
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const UserController = require("../controllers/user.js");

router
  .route("/signup")
  .get(UserController.renderSignupForm)
  .post(wrapAsync(UserController.signup));

router
  .route("/login")
  .get(UserController.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    UserController.login,
  );

router.get("/logout", UserController.logout);
module.exports = router;

//passport.authenticate() is a middleware used in our post route to authenticate users
