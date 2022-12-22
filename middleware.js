module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        //세션에  요청 전 url 저장
        req.flash('error','you must be signed in first')
        return res.redirect('/login')
    }
    next();
}