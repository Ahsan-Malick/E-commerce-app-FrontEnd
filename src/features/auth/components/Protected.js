import React from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedUsers } from '../AuthSlice'
import { Navigate } from 'react-router-dom'


export default function Protected({children}) {

const user = useSelector(selectLoggedUsers)

if(!user){
    return <Navigate to = '/SignIn'> </Navigate>
}
else
  return (
    children
  )
}
