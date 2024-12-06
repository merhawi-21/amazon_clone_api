
const express = require("express");
const cors =require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
app.use(cors({origin:true}));
app.use(express.json());

app.get("/",(req,res)=>{
  res.status(200).json({
    message:"Success"
  })
})

app.post("/payment/create",async(req,res)=>{
  const total= req.query.total
  if(total > 0){
   const paymentIntent =await stripe.paymentIntents.create({
    amount: total,
    currency: "usd" 
   })
   console.log(paymentIntent)
   res.status(201).json({
    clientSecreat: paymentIntent.client_secret,
  })
  }else{
    res.status(403).json({
      message: "total amount must be greater than 0"
    })
  
  }
})

app.listen(3000,(err)=>{
  if(err) throw  err
    console.log("Amazon server runninig on PORT: 3000, http://localhost:3000")
    
})




