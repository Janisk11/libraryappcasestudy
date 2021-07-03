const express = require('express');
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter =require ('./routes/index')
const authorRouter =require ('./routes/authors')

app.set('view engine','ejs')
app.set('views',__dirname +'/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://userone:userone@ictakfiles.qofk2.mongodb.net/CaseStudyLibrary?retryWrites=true&w=majority',{useNewUrlParser:true})

app.use('/',indexRouter)
app.use('/authors',authorRouter)


app.listen(process.env.PORT || 3000)