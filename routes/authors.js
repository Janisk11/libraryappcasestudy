const express = require('express');
const router = express.Router()
const Author = require('../models/author')
const multer = require('multer')

// define storaage for the images
const storage = multer.diskStorage({
    // destination for files
    destination: function(req, file, callback){
        callback(null,'./public/uploads/images');
    },


    // add back the extension
    filename:function(req, file, callback){
        callback(null,Date.now() + file.originalname)
    },
});

// upload parameters for multer
const upload = multer({
    storage: storage
});


// All Authors Route
router.get('/', (req,res)=>{
   Author.find()
   .then(function(authors){
    res.render('authors/index',{
        authors,
        // title:Authors
       
    });
   })
   
})



//New Author Routes
router.get('/new',(req,res)=>{
res.render('authors/new',{author:new Author() })
})


// Create author Route
router.post('/',upload.single('image'),  (req,res)=>{
   var authoritem = new Author({
        name:req.body.name,
        about:req.body.about,
        image:req.file.filename
    }) 
    var author = Author(authoritem);
    author.save();
    res.redirect('authors')
  

    })

// single Author
router.get('/:id',function(req,res){
    const id = req.params.id
    Author.findOne({_id: id})
    .then(function(author){
        res.render('authors/single',{
            author
        });
    })
       
});




module.exports = router