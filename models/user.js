const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email:{
        type:String,
        required: true,
        unique:true
    }
})

UserSchema.plugin(passportLocalMongoose); //pw와 id를 알아서 생성하고 유효성도 검사해줌

module.exports = mongoose.model('User',UserSchema)