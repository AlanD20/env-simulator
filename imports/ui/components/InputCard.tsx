import React from 'react'

type InputCardProps = {
    handle: React.ChangeEventHandler<HTMLInputElement>,
    value: number | undefined,
    id: string,
    text: string
}

export default function InputCard({text,value,id,handle}: InputCardProps) {
  return (
    <div className='input-card'>
        <label htmlFor={id}>{text}</label>
          <input 
            onChange={handle}
            value={value}
            type="number"
            className='input'
            id={id}
            />
    </div>
  )
}