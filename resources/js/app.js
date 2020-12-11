const { update } = require("../../app/models/menu")
import axios from 'axios'


let addToCart= document.querySelectorAll('.add-to-cart')

function updateCart(pizza)
{
    // ajax call, we will use axios
    axios.post('/update-cart',pizza).then(res =>{
        console.log(res);
    })
}
addToCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        
        // 
        let pizza=JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
    })
})
