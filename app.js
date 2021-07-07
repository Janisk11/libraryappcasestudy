const express = require('express');
const app = express()
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');

// port
const port = process.env.PORT || 3000 ;

const indexRouter =require ('./routes/index')
const authorRouter =require ('./routes/authors')
const bookRouter =require ('./routes/books')
const loginRouter =require ('./routes/login')

app.set('view engine','ejs')
app.set('views',__dirname +'/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://userone:userone@ictakfiles.qofk2.mongodb.net/CaseStudyLibrary?retryWrites=true&w=majority',{useNewUrlParser:true,useCreateIndex: true,useFindAndModify: false, useUnifiedTopology: true } )

app.use('/',indexRouter)
app.use('/authors',authorRouter)
app.use('/books',bookRouter)
app.use('/login',loginRouter)


app.listen(port,()=>{
    console.log("Server is ready at " + port);
});