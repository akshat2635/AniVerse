// import React from 'react'
"use client"
export default function ErrorBoundary({error}) {
  return (
    <div>
      Anime not Found
      {error.message};
    </div>
  )
}
