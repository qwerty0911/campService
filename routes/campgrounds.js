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

router.get('/', catchAsync(campgrounds.index))

//post form 
router.get('/new',isLoggedIn,campgrounds.renderNewForm)

//post 생성 요청
router.post('/',validateCampground,isLoggedIn, catchAsync(campgrounds.createCampground))

//post 상세 페이지 랜더
router.get('/:id', catchAsync(campgrounds.renderDetailPage))

//post 수정 form
router.get('/:id/edit',isLoggedIn,isAuthor, campgrounds.renderUpdateForm)

//post 업데이트 요청
router.put('/:id', validateCampground,isLoggedIn,isAuthor, catchAsync( async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    req.flash('success','Successfully update a campground!')
    res.redirect(`/campgrounds/${campground._id}`)
}))

//post 삭제
router.delete('/:id',isLoggedIn, isAuthor, async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndDelete(id)
    req.flash('success','Successfully delete a campground!')
    res.redirect('/campgrounds')
})

module.exports = router;