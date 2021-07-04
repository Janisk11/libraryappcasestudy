const mongoose =require('mongoose');

const authorSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
        },
    image: {
        type:String,
        required:true
        },
    about: {
        type:String,
        required:true
        }
})

module.exports= mongoose.model('Author',authorSchema)