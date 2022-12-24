const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const {campgroundSchema, reviewSchema} = require('../schemas')
const Review = require('../models/review')
const { find } = require('../models/review');
const {isLoggedIn,  isAuthor, validateCampground} =  require('../middleware')

router.get('/', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
})

//post form 
router.get('/new',isLoggedIn , (req, res) => {
    
    res.render('campgrounds/new')
})

//post 생성 요청
router.post('/',validateCampground,isLoggedIn, catchAsync( async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id
    await campground.save();
    req.flash('success','Successfully made a  new campground!')
    res.redirect(`/campgrounds/${campground._id}`);
}))

//post 상세 페이지 랜더
router.get('/:id', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate({
        path:'reviews',
        populate:{
            path:'author'
        }
    }).populate('author');
    if(!campground){
        req.flash('error','Cannot find that campground...')
        res.redirect('/campgrounds')
    }
    res.render('campgrounds/show', { campground})
}))

//post 수정 form
router.get('/:id/edit',isLoggedIn,isAuthor, async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id)

    if(!campground){
        req.flash('error','Cannot find that campground...')
        res.redirect('/campgrounds')
    }//페이지가 없을때
    res.render('campgrounds/edit', { campground })
})

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