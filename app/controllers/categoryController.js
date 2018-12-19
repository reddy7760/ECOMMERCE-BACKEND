const express = require('express');
const router = express.Router();//express middleware
// console.log(router);
const { ObjectID } = require('mongodb');
const { Category } = require('../models/category');

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
//localhost:3000/categories/
router.get('/', function(req, res){
    Category.find().then(function(categories){
        res.send(categories)
    }).catch(function(err){
        res.send(err);
    })
});

//localhost:3000/categories/id

router.get('/:id',validateId, function(req,res){
    let id = req.params.id;
    if(!ObjectID.isValid(id)){
        res.send({
            notice:'invalid object id'
        })
    }
    Category.findById(id).then(function(category){
        res.send(category);
    }).catch(function(err){
        res.send(err);
    })
})

//post localhost:3000/categories
router.post('/', function(req,res){
    let body = req.body;
    let c = new Category(body);
    c.save().then(function(category){
        res.send(category);
    }).catch(function(err){
        res.send(err);
    })
})


router.put('/:id',validateId,function(req,res){
    let id = req.params.id
    let body = req.body
    Category.findByIdAndUpdate(id,{$set:body},{ new: true}).then(function(category){
        res.send(category);
    }).catch(function(err){
        res.send(err);
    })
})

router.delete('/:id', function(req,res){
    let id = req.params.id;
    Category.findByIdAndDelete(id).then(function(category){//mongodb method
        res.send({
            notice: 'Successfully deleted '
        })
    }).catch(function(err){
        res.send(err);
    })

    
})

module.exports = {
    categoriesController: router
}