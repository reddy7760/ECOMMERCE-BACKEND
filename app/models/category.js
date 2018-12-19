const mongoose = require('mongoose');
const   Schema = mongoose.Schema;
const categorySchema = new Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:64
    },
})
const Category = mongoose.model('Category',categorySchema);

module.exports = {
    Category
}