const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
module.exports.createReview = async (req, res) => {
   if (!req.body.review.rating) {
    req.flash("error", "Please select a rating.");
    return res.redirect(`/listings/${req.params.id}`);
}
  let listingId = await Listing.findById(req.params.id); //to access listing
  //to create a new review
  let newReview = await new Review(req.body.review); // review created will be stored at backend and we will access it using this

  newReview.author = req.user._id;

  //pushing new review into our Listing review array created in Listing.js
  listingId.reviews.push(newReview);

  //now saving our id and review into database
  await newReview.save();
  await listingId.save();

  req.flash("success", "New Review Created!");
 
  res.redirect(`/listings/${listingId._id}`);
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params; //took both listing and review id to delete
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); //used $pull operator to delete (update) the review from review array from Listing model
  await Review.findByIdAndDelete(reviewId); //used reviewId and deleted it from database
  req.flash("success", "Review Deleted!");
  res.redirect(`/listings/${id}`); //redirected again to same page after deletion
};
