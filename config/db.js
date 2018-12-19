//ODM object data modeling
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/sept-ecommerce',{
    useNewUrlParser:true }).then(function(){
        console.log('connected to db');
    }).catch(function(err){
        console.log('error connecting to db',err);
    })
    mongoose.set('useCreateIndex',true);
    
    module.exports = {
        mongoose
    }