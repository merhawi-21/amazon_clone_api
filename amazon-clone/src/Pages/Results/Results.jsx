import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader/Loader';
import ProductCard from '../../components/Products/ProductCard';
import axios from 'axios';
import { productUrl } from '../../Api/endPoints';
import classes from './Results.module.css'

function Results() {

  const {categoryName} = useParams()
  const [results,setResults] = useState([])
  //console.log(categoryName);
  const [isLoading,setIsLoading] = useState(false)

  useEffect(()=>{
    axios.get(`${productUrl}/products/category/${categoryName}`)
    .then((res)=>{
      setResults(res.data)
      //console.log(res.data)
      setIsLoading(false)
    })
    .catch((error)=>{
      console.log(error)
      setIsLoading(false)
    })
},[categoryName])


  return (
    <Layout>
      <section>
        <h1 style={{padding:"30px"}}>Results</h1>
        <p style={{padding:"30px"}}>Category / {categoryName}</p>
        <hr />
        {isLoading?(<Loader/>):(<div className={classes.product_container}>
        {results?.length > 0 && results?.map((product)=>(<ProductCard 
          key={product.id} 
          renderAdd={true}
          product={product}
          />))}
          </div>
      )}
      </section>
    </Layout>
  )
}

      export default Results
