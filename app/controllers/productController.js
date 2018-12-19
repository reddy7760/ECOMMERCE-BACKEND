const express = require('express');
const router = express.Router();
const { Product } = require('../models/product');//object destructuring
const { ObjectID } = require('mongodb');
const validateId = (req,res,next) => {
    let id = req.params.id;
    if(!ObjectID.isValid(id)){
        res.send({
            notice:'invalid object id'
        })
    } 
    else {
        next();
    }
}

router.get('/',validateId,function(req,res){
    Product.find().then(function(products){
        res.send(products);
    }).catch(function(err){
        res.send(err);
    })    
})

router.get('/:id',validateId,function(req,res){
let id = req.params.id;
Product.findById(id).then(function(product){
    res.send(product);

}).catch(function(err){
    res.send(err);
})
})

router.post('/',validateId,function(req,res){
    let body = req.body;
    let c= new Product(body);
    c.save().then(function(product){
        res.send(product);
    }).catch(function(err){
        res.send(err);
    })
})

router.delete('/:id',function(req,res){
 let id = req.params.id;
 Product.findByIdAndDelete(id).then(function(product){
     res.send ({
         notice:"successfully deleted"

     })
 }).catch(function(err){
     res.send(err);
 })
})

module.exports = {
    productsController:router
}