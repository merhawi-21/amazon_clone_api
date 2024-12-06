import React from 'react'
import {categoryInfo} from './categoryData'
import CategoryCard from './CategoryCard'
import classes from './category.module.css'

function Category() {
  return (
    <>
    
    <div className={classes.category_container}>
      {
        categoryInfo.map((infos,index)=>
          <CategoryCard key={infos.id || index} data={infos} />
        )
      }
      
    </div>
    </>
  )
}

export default Category