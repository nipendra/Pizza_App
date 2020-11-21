const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const homeController = require('../app/http/controllers/homeController')

// routes

function initRouts(app)
{
    app.get('/', homeController().index)
    // (req,res)=>{ 
    //     res.render('home.ejs')
    // })  
    app.get('/cart',cartController().index)

    app.get('/login',authController().login)

    app.get('/register',authController().register)

}

// this is module so we have to export this 
module.exports=initRouts