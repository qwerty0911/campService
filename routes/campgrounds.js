const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const campgrounds = require('../controllers/campgrounds')
const {campgroundSchema, reviewSchema} = require('../schemas')
const Review = require('../models/review')
const { find } = require('../models/review');
const {isLoggedIn,  isAuthor, validateCampground} =  require('../middleware')


router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(validateCampground,isLoggedIn, catchAsync(campgrounds.createCampground))
    

router.get('/new',isLoggedIn,campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.renderDetailPage))
    .put(validateCampground,isLoggedIn,isAuthor, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, campgrounds.deleteCampground)

router.get('/:id/edit',isLoggedIn,isAuthor, campgrounds.renderUpdateForm)

module.exports = router;