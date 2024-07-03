'use client'
import React from 'react'
import { UserAuth } from '../context/AuthContext';
export default function profile() {
  const { user} = UserAuth();
  return (
    
    <div>
      {user? 
      (<div className='flex'>
      <img className='rounded-md p-2 m-2' src={user.photoURL} alt="dp" />
      <div className='p-2 m-1' >
        <h1>{user.displayName}</h1> 
        <h1>{user.email}</h1>
      </div>
      </div>
      )
      : "Not logged in"}
    </div>
  )
}
