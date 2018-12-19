const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            //vaildate the format of the email-custom validation
            validate:{
                validator: function(value) {
                    return validator.isEmail(value)
                },
                message: function(){
                    return 'invalid email format'
                }
            }
        },
        password: {
            type:String,
            minlength:8,
            maxlength:128,
            required:true
        },
        mobile: {
            type:String,
            unique:true,
            required:true,
            minlength:10,// minlength and maxlength built-in validators
            maxlength:10,  
            validate:{
                validator: function(value) {
                    return validator.isNumeric(value)
                },
                message: function(){
                    return 'invalid mobile number'
                }
        },
    },
    tokens:[{
        token: {
            type:String
        }
    }]

});

//to define our own instance methods

userSchema.methods.generateToken = function(){
    let user = this;
    let tokenData = {
        userId:this._id
    }
    let jwtToken = jwt.sign(tokenData,'secret1234')
    user.tokens.push({ token: jwtToken });

    return user.save().then(function(user){
        return jwtToken
    })
}

userSchema.pre('save',function(next){
    let user = this;
    if(user.isNew){
    bcryptjs.genSalt(10).then(function(salt){
        bcryptjs.hash(user.password,salt).then(function(encrypted){
            user.password = encrypted
            next()
        })
    }).catch(function(err){
        console.log(err);
    })
}
else{
    next();
}
});

userSchema.statics.findByCredentials = function(email,password){//statics allows us to create own property function
    let User = this //this refers to the User model
    return User.findOne({email:email}).then(function(user){// findOne returns one user with  entered email
        if(!user){
            return Promise.reject('email or password is incorrect');
        }

        return bcryptjs.compare(password,user.password).then(function(res){
            if(res){
                return Promise.resolve(user) // send back the user object
            }
            else{
                return Promise.reject('invalid username or password');
            }
        })
    })
}

userSchema.statics.findByToken = function(token){
    let User  = this
    let tokenData;

    try{
        tokenData = jwt.verify(token,'secret1234')
    }
    catch(err){
        return Promise.reject(err.message)
    }

    return User.findOne({
        '_id':tokenData.userId,
        'tokens.token':token

    })
}
const User = mongoose.model('User',userSchema);
module.exports = {
    User 
}
