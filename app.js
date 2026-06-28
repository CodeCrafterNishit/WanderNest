// Load environment variables in development
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// Express and core packages
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

// Database
const mongoose = require("mongoose");

// Authentication
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

// Session and flash
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");

// Utilities
const ExpressError = require("./utils/ExpressError.js");

// Routes
const listingRouter = require("./routes/listings.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const dbUrl = process.env.ATLASDB_URL;

// Connect to MongoDB
main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

// View engine and middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

// Store sessions in MongoDB
const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.log("Mongo Session Error:", err);
});

// Session configuration
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Make flash messages and current user available in all templates
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// Routes
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// Handle invalid routes
app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

// Global error handler
app.use((err, req, res, next) => {
  if (err.name === "CastError") {
    err = new ExpressError(400, "Invalid ID format");
  }

  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("listings/error.ejs", { err });
});

// Start server
const port = 8080;

app.listen(port, () => {
  console.log("App is listening on:", port);
});