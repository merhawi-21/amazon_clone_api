// import { useContext, useEffect, useState } from 'react'
// import './App.css'
// import Routering from './Routering'
// import { DataContext } from './components/DataProvider/DataProvider'
// import { Type } from './Utility/action.type'
// import { auth } from './Utility/firebase'




// function App() {

//   const [{user},dispatch]= useContext(DataContext)

//   useEffect(()=>{
//     auth.onAuthStateChanged((authUser)=>{
//       if(authUser){
//       //console.log(authUser)
//       dispatch({
//         type: Type.SET_USER,
//         user: authUser
//       })
//     }else{
//       dispatch({
//         type: Type.SET_USER,
//         user: null
//       })
//     }
//     })
//   },[])

//   return (
//     <>
//       <Routering/>
      
//     </>
//   )
// }

// export default App

import React, { useContext, useEffect } from 'react';
import './App.css';
import Routering from './Routering';
import { DataContext } from './components/DataProvider/DataProvider';
import { Type } from './Utility/action.type';
import { auth } from './Utility/firebase';

function App() {
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    if (!auth) {
      console.error('Firebase auth is not initialized');
      return;
    }

    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      dispatch({
        type: Type.SET_USER,
        user: authUser || null,
      });
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, [dispatch]);

  return <Routering />;
}

export default App;
