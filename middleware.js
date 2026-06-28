const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
// Import custom error class for structured error handling
const ExpressError = require("./utils/ExpressError.js");

// Import Joi validation schema for listings and reviews
const { listingSchema,reviewSchema  } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
  // console.log(req.path,"..",req.originalUrl);
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you must be logged in!");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "Sorry! you don't have permission");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.listingValidate = (req, res, next) => {
  // Validate request body against Joi schema
  let { error } = listingSchema.validate(req.body);

  // If validation fails, generate custom error
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }

  // If valid, continue to next middleware
  else {
    next();
  }
};

// Middleware for validating review data using Joi
module.exports. reviewValidate = (req, res, next) => {
  // Validate request body against Joi schema
  let { error } = reviewSchema.validate(req.body);

  // If validation fails, generate custom error
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }

  // If valid, continue to next middleware
  else {
    next();
  }
};

module.exports.isReviewAuthor = async (req, res, next) => {
  let { id,reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "Sorry! you don't have permission!");
    return res.redirect(`/listings/${id}`);
  }
  next();
};