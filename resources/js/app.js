// const { update } = require("../../app/models/menu")
import axios from 'axios'
// import { DocumentQuery } from 'mongoose'


let addToCart= document.querySelectorAll('.add-to-cart')
let cartCounter= document.querySelector('#cartCounter')
function updateCart(pizza)
{
    // ajax call, we will use axios
    axios.post('/update-cart',pizza).then(res =>{
        console.log(res);
        cartCounter.innerText=res.data.totalQty;
    })
}

addToCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{

        let pizza=JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
    })
})
