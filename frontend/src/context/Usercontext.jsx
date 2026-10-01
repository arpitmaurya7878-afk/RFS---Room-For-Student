import React, { useContext,Children, createContext, useEffect, useState } from 'react'
import { authDataContext } from './authContex'
import axios from "axios"




 export const userDataContext = createContext()

 function Usercontext({children}) {

   let {serverUrl} = useContext(authDataContext)
   let [searchResults, setSearchResults] = useState(null);
   let [userData,setUserData] = useState(null)

   let getCurrentUser = async () => {
    try {
        let result = await axios.get(serverUrl + "/api/user/currentuser",
            {withCredentials:true}
        )
        setUserData(result.data)
    } catch (error) {
        // setUserData(null)
        console.log(error)
    }
   }

   useEffect(() => {
      getCurrentUser()
   },[])


    let value = {
  userData,
  setUserData,
  searchResults,
  setSearchResults
};
   return (
     <div>
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
     </div>
   )
 }
 
 export default Usercontext