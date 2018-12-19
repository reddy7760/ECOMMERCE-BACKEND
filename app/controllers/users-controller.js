const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const {   authenticateUser } = require('../middlewares/authentication');

// router.post('/',function(req,res){
//     let body = req.body;
//     let user = new User(body)
//     user.save().then((function(user){//save method is provided by mongoose
//         res.send({
//             user,
//             notice:'successfully registered'
//         })
//     })).catch(function(err){
//         res.send(err);
//     })
// })

router.post('/',function(req,res){
    let body = req.body;
    let user = new User(body)

  return  user.save().then((function(user){
        return user.generateToken()
    }))
    .then(function(token){
        res.header('x-auth',token).send()//header property 
    })
    .catch(function(err){
        res.send(err);
    })
})
 router.post('/login',function(req,res){
     let body = req.body;
     User.findByCredentials(body.email,body.password).then(function(user){
        //  res.send(user);//responding to the user object
        return user.generateToken()//instance method
     }).then(function(token){
         res.header('x-auth',token).send()
     })
     .catch(function(err){
         res.status(401).send(err);//Promise.reject
     })
 })

 router.get('/profile',authenticateUser,function(req,res){
        //  let user = req.user
     res.send({
         username:req.user.username,
         email:req.user.email,
         mobile:req.user.mobile
     })
 })

 router.delete('/logout',authenticateUser,function(req,res){
     const {user,token} = req
     const tokenInfo = user.tokens.find(function(tokenItem){
         return tokenItem.token == token
     })
    //  user.tokens.remove(tokenInfo._id)
    user.tokens.id(tokenInfo._id).remove()
     user.save().then(() => {
         res.send({
             notice:"successfully logged out"
         })
     })
 })

module.exports = {
    usersController: router
}