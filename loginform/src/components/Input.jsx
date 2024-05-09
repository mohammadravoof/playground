import React from 'react'

function Input({name,type}) {
  return (
    <div className="flex justify-between gap-4">
            <label className="font-bold" htmlFor="">{name}</label>
            <input className="border-b border-black bg-transparent placeholder-black focus:outline-none"
                    type={type} placeholder={`Enter ${name}`}  />
    </div>
  )
}

export default Input