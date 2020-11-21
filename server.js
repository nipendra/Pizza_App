const express=require('express')
const ejs=require('ejs')
const expressLayout=require('express-ejs-layouts')
const path=require('path')
const app=express()
const PORT=process.env.PORT || 3000
require('dotenv').config();
const mongoose= require('mongoose')


    // url= 'mongodb+srv://nipendra:pizza-app@pizza-app.o1cb0.mongodb.net/pizza-app?retryWrites=true&w=majority'
    url='mongodb://localhost:27017/pizza-app'

    // database connection
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true, useFindAndModify:true});
    //Get the default connection
    var connection = mongoose.connection;

    connection.once('open',()=>{
        console.log("Database connected...")
    }).catch(err => {
        console.log("Connection failed...")
    })

// set template engine  and path to views 
app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')

require('./routes/web.js')(app)

app.listen(PORT,()=>{
    console.log(`listing on port ${PORT}`)
})
 