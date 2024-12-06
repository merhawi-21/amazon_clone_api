import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import Rating from '@mui/material/Rating'
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat'
import classes from './products.module.css'
import { DataContext } from '../DataProvider/DataProvider'
import {Type} from '../../Utility/action.type'


function ProductCard({product={},flex,renderDesc}) {

  const {id,title,price,description,image,rating}= product;

  const [state,dispatch] = useContext(DataContext)  
  //console.log(state);

  const addToCart = () => {
      dispatch({
        type: Type.ADD_TO_BASKET,
        item: { id, title, price, description, image, rating },
      });
  
   };

  return (
    <div className={flex?classes.product_flexed: classes.card_container } >

      
      <Link to={`/products/${id}`}>
        <img src={image} alt="product Image" />
      </Link>
      <div>
        <h3>{title}</h3>
          {renderDesc && <div style={{maxWidth:"750px"}}>{description}</div>}
        <div className={classes.rating}>
          <Rating value={rating?.rate} precision={0.1}/>
          <small>{rating?.count}</small>
        </div>
        
        <div>
          <CurrencyFormat amount={price}/>
        </div>
        
        <button onClick={addToCart} className={classes.oreder_button} >
          add to cart
        </button>
       
      </div>
      
    </div>
  )
}

export default ProductCard

