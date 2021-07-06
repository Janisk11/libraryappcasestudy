const mongoose =require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
        },
    author: {
            type:String,
            required:true
            },

     genre: {
            type:String,
            required:true
            },
     date: {
            type:Date,
             required:true
            },
    image: {
        type:String,
        required:true
        }
   
})

var Book = mongoose.model('Book',bookSchema)

module.exports = Book