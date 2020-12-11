function cartController()
{
    // factory pattern/ function
    return {
        index (req,res){
            res.render('customers/cart.ejs')
        },
        update(req,res){
            let cart ={
                items:{
                    pizzaId: {item: pizzaObject, qty:0},
                },
                totalQty: 0,
                totalprices: 0,
            }
            return res.json({data:'All ok'})
        }
        
    }
}


module.exports=cartController