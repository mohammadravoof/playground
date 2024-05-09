import React from 'react'

function Button({children}) {
  return (
    <button className='flex justify-center items-center w-[248px] h-[36px] border border-black text-white
     bg-black m-5 shadow shadow-white'>{children}</button>
  )
}

export default Button