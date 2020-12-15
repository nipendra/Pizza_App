
const User = require('../../models/user')
const bcrypt = require('bcrypt')
function authController()
{
    // factory pattern/ function
    return {
        login (req,res){
            res.render('auth/login.ejs')
        },
        
        register(req,res){
            res.render('auth/register.ejs')
        },
        async postRegister(req, res){
            const { name, email, password } = req.body
            // console.log(req.body)
            // validation of request 
            if(!name || !email || !password){
                req.flash('error', 'All feilds are required')
                req.flash('name', name)
                req.flash('email', email)
                return res.redirect('/register')
            }

            // check if email exist in DB

            User.exists({email:email}, (err, result) => {
                    if(result){
                        req.flash('error', 'Email already taken')
                        req.flash('name', name)
                        req.flash('email', email)
                        return res.redirect('/register')
                    }

            })


             // Hash password using pakage bcrypt 
             const hashedPassword = await bcrypt.hash(password, 10)


            // create a user if not exist
            const user = new User({
                name: name,
                email:email,
                password: hashedPassword
                //  don't directly store password in DB
            })

            user.save().then((user) => {
                // login
                return res.redirect('/')
            }).catch(err => {
                         req.flash('error', 'Something went wrong')
                        return res.redirect('/register')
            })

           
        }
    }
}


module.exports=authController