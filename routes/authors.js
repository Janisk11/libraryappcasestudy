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
router.get('/',async (req,res)=>{
    try {
        const authors =await Authors.find({})
        res.render('authors/index',{authors : authors});
    } catch (error) {
        res.redirect('/')
    }
   
})

//New Author Routes
router.get('/new',(req,res)=>{
res.render('authors/new',{author:new Author() })
})


// Create author Route
router.post('/',upload.single('image'), async (req,res)=>{
    const author = new Author({
        name:req.body.name,
        about:req.body.about,
        image:req.file.filename
    }) 
    try {
        const newAuthor = await author.save()
        // res.redirect('authors/${newAuthor.id}')
        res.redirect('authors')
    } catch (error) {
        res.render('authors/new',{
                        author:author,
                        errorMessage: 'Error creating Author'
                    })
    }
    // author.save((err, newAuthor) => { 
    //     if (err){
    //         res.render('authors/new',{
    //             author:author,
    //             errorMessage: 'Error creating Author'
    //         })
    //     }else{
    //         res.redirect('authors')
    //     }

    // })

    })

module.exports = router