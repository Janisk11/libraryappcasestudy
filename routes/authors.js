const express = require('express');
const { get } = require('.');
const router =express.Router()

// All Authors Route
router.get('/',(req,res)=>{
    res.render('authors/index');
})

//New Author Routes
router.get('/new',(req,res)=>{
res.render('authors/new')
})


// Create author Route
router.post('/',(req,res)=>{
    res.send('Create')
    })

module.exports = router