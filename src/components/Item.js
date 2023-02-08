import React from 'react'


function Item({ data }) {
  return (
    <div className='shadow-md bg-white text-center'>
      <p className='text-2xl p-10'>DOG</p>
      <img src={data.message}/>
    </div>
  )
}

export default Item