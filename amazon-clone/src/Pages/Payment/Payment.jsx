import React,{useContext,useState} from 'react'
import classes from './Payment.module.css'
import Layout from '../../components/Layout/Layout'
import {DataContext} from '../../components/DataProvider/DataProvider'
import ProductCard from '../../components/Products/ProductCard'
import {useStripe, useElements,CardElement} from '@stripe/react-stripe-js';
import CurrencyFormat from '../../components/CurrencyFormat/CurrencyFormat'
import {axiosInstance} from '../../Api/axios'
import { ClipLoader } from 'react-spinners'
import {db} from '../../Utility/firebase'
import { useNavigate } from 'react-router-dom'
import { Type } from '../../Utility/action.type' 


function Payment() {

  const [{user,basket},dispatch] = useContext(DataContext);
  //console.log(user)

  const totalItem =basket?.reduce((amount,item)=>{
    return item.amount + amount
   },0)

   const total =basket.reduce((amount,item)=>{
    return item.price *item.amount + amount
   },0)

   const [cardErr,setCardErr] = useState(null)
   const [processing,setProcessing] =useState(false)

   const stripe = useStripe();
   const elements = useElements();
   const navigate = useNavigate()

  //  const handleChange =(e)=>{
  //     e?.error?.message? setCardErr(e?.errors?.message):setCardErr("")
  //  }

  const handleChange = (e) => {
    setCardErr(e.error ? e.error.message : "");
  };
  

   const handlePayment = async(e)=>{
    e.preventDefault();
    
    try {
      //1. backend or functions contact to the cleant secret
      setProcessing(true)
      const response = await axiosInstance({
        method:"POST",
        url:`/payment/create?total=${total*100}`,
        
      })
      //console.log(response.data)
      const clientSecret = response.data?.clientSecret;
      //2. client side (react side confirmation)
      const {paymentIntent} = await stripe.confirmCardPayment
      (clientSecret,
        {
          payment_method:{ 
          card: elements.getElement(CardElement),
        },
      });
         //console.log(paymentIntent);
      //3. after confirmation --- order firestore database save,clear basket

      await db.collection("users")
      .doc(user.uid)
      .collection("orders")
      .doc(paymentIntent.id)
      .set({
        basket:basket,
        amount:paymentIntent.amount,
        created:paymentIntent.created,
      });
      // set basket empty after perchise
      dispatch({type:Type.EMPTY_BASKET});
      

      setProcessing(false);
      navigate("/orders",{state:{msg:"you have placed new order"}})
    } catch (error) {
      //console.log(error)
      setProcessing(false)
    }
   }

  return (
    <Layout>
      {/* header */}
      <div className={classes.payment_header}>
        checkout {totalItem} items
      </div>
      {/* payment methode */}
      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div >
          <div>{user.email}</div>
          <div>123 react learn</div>
          <div>Stockholm</div>
          </div>
        </div>
        <hr />
        {/* products */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
              {
                basket?.map((item)=><ProductCard product={item} flex={true}/>)
              }
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment_card_container}>
              <div className={classes.payment_details}>
                <form onSubmit={handlePayment}>
                  {cardErr && (
                    <small style={{color:"red"}}>{cardErr}</small>)}
                  <CardElement onChange={handleChange}/>
                  {/* price */}
                  <div className={classes.payment_price}>
                    <div>
                      <span>
                        Total Order	|<CurrencyFormat amount={total}/>
                      </span>
                    </div>
                    <div className='pay_btn'>
                      <button type='submit'>
                         {
                          processing?(
                              <div className='loading'>
                                <ClipLoader color='gray' size={12}/>
                                <p>Please wait....</p>
                              </div>
                          ):""
                         }
                        Pay now

                        </button>
                    </div>
                  </div>
                </form>
              </div>
          </div>
        </div>

      </section>
    </Layout>
  )
}

export default Payment