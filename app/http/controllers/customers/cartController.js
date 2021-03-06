function cartController()
{
    // factory pattern/ function
    return {
        index (req,res){
            res.render('customers/cart.ejs')
        },
        update(req,res){
            // let cart ={
            //     items:{
            //         pizzaId: {item: pizzaObject, qty:0},
            //     },
            //     totalQty: 0,
            //     totalprices: 0,
            // }
            

// for first cart request 
            if(!req.session.cart){

                    req.session.cart = {
                            items:{},
                         totalQty: 0,
                        totalprices: 0
                            
                    }
            }
            
            let cart = req.session.cart;
            // console.log(req.body)
            // check if cart does not in cart
            if(!cart.items[req.body._id] ) {
                    cart.items[req.body._id]={
                        item:req.body,
                        qty:1
                    }
                cart.totalQty = cart.totalQty+1;
                cart.totalprices = cart.totalprices + req.body.price;
              
            } else{

                cart.items[req.body._id].qty =cart.items[req.body._id].qty+1;
                cart.totalQty = cart.totalQty+1;
                cart.totalprices+=req.body.price;
            }

            return res.json({totalQty:req.session.cart.totalQty})
        }
        
    }
}


module.exports=cartController