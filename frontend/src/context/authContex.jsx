import React, { createContext } from 'react'



export const authDataContext = createContext()


function AuthContex({children}) {
    let serverUrl = "https://rfs-room-for-student-backend.onrender.com"


   let value = {
        serverUrl
    }
  return (
    <div>
        <authDataContext.Provider value = {value}>
            {children}
        </authDataContext.Provider>
    </div>
  )
}

export default AuthContex
