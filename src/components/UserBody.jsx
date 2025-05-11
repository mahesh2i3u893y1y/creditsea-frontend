import React from 'react'
import Navbar from './navbar'
import { User } from './User'
import UserLoans from './UserLoans'

const UserBody = () => {
  return (
    <div className='bg-[#EFEFEF] min-h-screen'>
        <Navbar/>
        <User/>
        <UserLoans/>
    </div>
  )
}

export default UserBody