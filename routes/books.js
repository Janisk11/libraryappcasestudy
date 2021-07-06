const express = require('express');
const router = express.Router()
const Book = require('../models/book')
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
   Book.find()
   .then(function(books){
    res.render('books/index',{
        books,
        // title:Authors
       
    });
   })
   
})



//New Author Routes
router.get('/new',(req,res)=>{
res.render('books/new',{book:new Book() })
})


// Create author Route
router.post('/',upload.single('image'),  (req,res)=>{
   var bookitem = new Book({
        title:req.body.title,
        author:req.body.author,
        genre:req.body.genre,
        date:req.body.date,
        image:req.file.filename
    }) 
    var book = Book(bookitem);
    book.save();
    res.redirect('/books')
  

    })


// single Author
router.get('/:id',function(req,res){
    const id = req.params.id
    Book.findOne({_id: id})
    .then(function(book){
        res.render('books/single',{
            book
        });
    })
       
});

router.get('/:id/edit',function(req,res){
    const id = req.params.id
    Book.findOne({_id: id})
    .then(function(book){
        res.render('books/edit',{
            book:book
        });
    })
   
    
});


router.put('/:id',upload.single('image'),function(req,res){
    
    id = req.params.id,
    title=req.body.title,
    author=req.body.author,
    genre=req.body.genre,
    date=req.body.date,
    image=req.file.filename
   
   Book.findByIdAndUpdate({_id: id},
                                {$set:{
                                    "title":title,
                                   " author":author,
                                    "genre":genre,
                                    "date":date,
                                    "image":image
                            }
                                }).exec()
       
        res.redirect('/books');
   
    })


router.delete('/:id',function(req,res){
    const id = req.params.id
    Book.findOneAndDelete({_id: id})
    .then(function(book){
    res.redirect('/books');
});
       
});

 








module.exports = router