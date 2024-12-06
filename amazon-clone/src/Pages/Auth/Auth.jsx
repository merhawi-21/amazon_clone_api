import React, { useState,useContext } from 'react'
import classes from './SignUp.module.css'
import {Link ,useNavigate,useLocation} from "react-router-dom"
import {auth} from '../../Utility/firebase'
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth'
import {DataContext} from "../../components/DataProvider/DataProvider"
import {ClipLoader} from 'react-spinners'
import {Type} from '../../Utility/action.type'

function Auth() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const [{user},dispatch]=useContext(DataContext)
  const navStateData =useLocation();

  //console.log(user)

  const[loading,setLoading] =useState({
    signin: false,
    signup:false,
  })
  const navigate= useNavigate()


const authHandler= async(e)=>{
  e.preventDefault()
   console.log(e.target.name)
  if(e.target.name=='signin'){
    setLoading({...loading, signin:true})
    signInWithEmailAndPassword(auth,email,password).then((userInfo)=>{
      console.log(userInfo)
        dispatch({
          type:Type.SET_USER,
          user:userInfo.user
        })
          setLoading({...loading,signin:false})
          // navigate("/")
          navigate(navStateData?.state?.redirect||"/");

    }) .catch((error)=>{
         setError(error.message)
         setLoading({...loading,signin:false})
    })
      
  } else{
    setLoading({...loading, signup:true})
    createUserWithEmailAndPassword(auth,email,password)
    .then((userInfo)=>{
      dispatch({
        type: Type.SET_USER,
        user:userInfo.user
      })
      setLoading({...loading, signup:false})
      // navigate("/")
      navigate(navStateData?.state?.redirect||"/");
    }) .catch((error)=>{
        setError(error.message)
        setLoading({...loading, signup:false})
    })
      
  }
}

  return (
    <section className={classes.login_page}>
      <Link to={"/"}>
      <img src="https://assets.aboutamazon.com/dims4/default/c7f0d8d/2147483647/strip/true/crop/6110x2047+0+0/resize/645x216!/format/webp/quality/90/?url=https%3A%2F%2Famazon-blogs-brightspot.s3.amazonaws.com%2F2e%2Fd7%2Fac71f1f344c39f8949f48fc89e71%2Famazon-logo-squid-ink-smile-orange.png" alt="amazon logo" />
      </Link>

      <div className={classes.login_container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small style={
            {
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold"
            }
          }>
            {navStateData?.state?.msg}
          </small>
        )}
        <form action="">
          <div>
            <label htmlFor="email"> Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id='email' />
          </div>
            <label htmlFor="password"> password</label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id='password' />
          <div >
            <button type='submit' onClick={authHandler} name='signin' className={classes.signIn_btn}>{loading.signin? (<ClipLoader color='#000'  size={15}/>):("Sign in")}</button>
          </div>
        </form>
        {/* agreement */}
        <p>By Signing-in you agree to the Fake amazone-clone use of conditions. This is a demo site, so avoid entering sensitive or real information.</p>
        {/* create account butten */}
        <button type='submit' onClick={authHandler} name='signup' className={classes.register_button}>
        {
        loading.signup? (<ClipLoader color='#000'  size={15}/>):("Create your Amazon account")
        }
          
          </button>
        {error && (<small style={{paddingTop: "5px",color:"red"}}>{error}</small>)}
      </div>
    </section>
  )
}

export default Auth