const express = require('express');
const router = express.Router({mergeParams:true}); 
const catchAsync = require('../utils/catchAsync');
const Review = require('../models/review');
const reviews = require('../controllers/reviews')
const Campground = require('../models/campground');
const {campgroundSchema, reviewSchema} = require('../schemas')
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware')

router.post('/',isLoggedIn,validateReview, catchAsync(reviews.createNewReview))

router.delete('/:reviewId',isLoggedIn, isReviewAuthor, catchAsync( async (req,res)=>{
    const {id, reviewId} = req.params
    await Campground.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','Deleted a review!')
    res.redirect(`/campgrounds/${id}`)
}))

module.exports = router;