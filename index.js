const express = require('express');
const app = express();
const { mongoose } = require('./config/db');
// const mongoose = require('./config/db').mongoose
// const {categoriesController} = require('./app/controllers/categoryController');
// const {productsController} = require('./app/controllers/productController');
// const { usersController } = require('./app/controllers/users-Controller');
const { bookmarkController } = require('./app/controllers/bookmarkController');
const { Bookmark } = require('./app/models/bookmark') 


const port  = 3000;
app.use(express.json());

app.get('/',function(req,res){
    res.send('welcome to site');
})

app.get('/:hash',function(req,res){
    let hashedUrl = req.params.hash;
      Bookmark.findOne({hashedUrl:hashedUrl}).then(function(bookmark){
           res.redirect(bookmark.original_url);
       }).catch(function(err){
           res.send(err);
       })
})
//get/categories
//get/categories/id
//post/categories
//put/categories/id
//delete/caategories/id

// app.use('/categories',categoriesController)
// app.use('/products',productsController)
// app.use('/users',usersController)
app.use('/bookmarks',bookmarkController);
app.use('/hash',Bookmark);



app.listen(port,function(){
    console.log('listening to port',port);
})