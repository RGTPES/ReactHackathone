import React from 'react'
import Header from '../components/Header'
import BookList from '../components/BookList'
export default function DefaultLayout() {
  return (
    <div className='bg-slate-100'>
      <Header />  
      <BookList/>  
    </div>
  )
}
