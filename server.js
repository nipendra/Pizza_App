const express=require('express')
const app=express()
const ejs=require('ejs')
const expressLayout=require('express-ejs-layouts')
const path=require('path')
const PORT=process.env.PORT || 3000
require('dotenv').config();
const mongoose= require('mongoose')
const { connect } = require('http2')
const session = require('express-session')
const flash=require('express-flash')
const MongoDBStore= require('connect-mongo')(session)


// Database Connection

// Connection URL
const url = 'mongodb://localhost:27017/pizza-app';
 
// Use connect method to connect to the server
mongoose.connect(url, {useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true,
useFindAndModify:true});
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log('Database Connected ...');
}).catch(err => {
    console.log('Connection failed...');
});

// session store right now we are connecting with mongo but it can be connected with redis etc db 
let mongoStore = new MongoDBStore({
        mongooseConnection:connection,
        collection: 'sessions',
}) 

// session configuration, this lib work as middleware
app.use(session({
    secret:process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: {maxAge: 1000*60*60*24 } // 24 h aprox

}))

app.use(flash())
// Assets location 
app.use(express.static('public'));


app.use(express.json())
app.use(express.urlencoded({extended: false}))

// global middlware  for accesing cartQantity
app.use((req, res, next) => {
    res.locals.session = req.session
    next() // for ending the process 
})
// set template engine  and path to views 
app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')





require('./routes/web.js')(app)



app.listen(PORT,()=>{
    console.log(`listing on port ${PORT}`)
})
 
