import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import Loader from '../Loader/Loader'
import classes from './products.module.css'


function Product() {

  const[products,setProducts]=useState([0])
  const [isLoading,setIsLoading] = useState(false)

  useEffect(()=>{
      axios.get('https://fakestoreapi.com/products')
      .then((res)=>{
        setProducts(res.data)
        setIsLoading(false)
      })
      .catch((error)=>{
        console.log(error)
        setIsLoading(false)
      })
  },[])

  return (
    <>
    
    {isLoading?(<Loader/>): (<section className={classes.product_container}>
      {
        products.map((singleProduct)=>(
              <ProductCard product={singleProduct} key={singleProduct.id}/>
            ))
      }
      
    </section>)}
    
    </>
    
      
  )
}

export default Product