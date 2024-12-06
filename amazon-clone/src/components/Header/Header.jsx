import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import classes from './Header.module.css'
import amazonLogo from '../../assets/amazon_logo.png'
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCartAdd } from "react-icons/bi";
import LowerHeader from './LowerHeader';
import { DataContext } from '../DataProvider/DataProvider';
import {auth} from '../../Utility/firebase'


function Header() {

    const [{user,basket},dispatch]=useContext(DataContext);

    const totalItem =basket?.reduce((amount,item)=>{
      return item.amount + amount
     },0)
   

  return (
    <>
    <section className={classes.fixed}>
    <section>
      <div className={classes.header_container}>
        
        <div className={classes.amazon_logo}>
          <Link to={"/"}>
            <img src={amazonLogo} alt="amazon logo" />
          </Link>
        </div>
        <div className={classes.delivery}>
          <span><SlLocationPin /></span>
          <div>
            <p>Deliver to</p>
            <span>Sweden</span>          
          </div>
        </div>
      
      <div className={classes.search}>
      <select name="" id="">
        <option value="">All</option>
      </select>
      <input type="text" />
      
      <BsSearch size={38} />
         
      </div>

      <div className={classes.order_container}>
        <Link to={"/"} className={classes.language}>
          <img src="https://image.shutterstock.com/image-vector/usa-waving-flag-pattern-background-260nw-2480140689.jpg" alt="USA Flag" />

          <select name="" id="">
            <option value="">EN</option>
          </select>
        </Link>

        <Link to={!user && "/auth"}>
        <div>
          {
            user?(

              <>
                <p>Hello {(user?.email?.split("@")[0])}</p>
               <span onClick={()=>auth.signOut()}>Sign Out</span>
              </>
            ):(
              <>
                <p>Hello, Sign In</p>
                <span>Account & Lists</span>
              </>
            )
          }
        </div>
        
        </Link>

        <Link to={"/orders"}>
          <p>Returns</p>
          <span>& Orders</span>
        </Link>

        <Link to={"/cart"} className={classes.cart}>
        <BiCartAdd size={40} />
        <span>{totalItem}</span>
        Cart
        </Link>
      </div>
      </div>     
    </section>
    <LowerHeader/>
    </section>
    </>
  )
}

export default Header


