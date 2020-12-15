const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const homeController = require('../app/http/controllers/homeController')

// routes

function initRoutes(app)
{

    app.get('/',homeController().index)


    app.get('/cart',cartController().index)


    app.post('/update-cart',cartController().update)
    
    
    app.get('/login', authController().login)

    
    app.get('/register',authController().register)

    // (req,res)=>{
    //     res.render('auth/register')
    // })
    app.post('/register',authController().postRegister)
}

// this is module so we have to export this 
module.exports=initRoutes