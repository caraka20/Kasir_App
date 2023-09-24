import React, { forwardRef } from 'react'

const InputName = forwardRef ((props, ref) => {
  return (
    <input ref={ref} type={props.type} placeholder={props.name}  required   className="input cursor-pointer w-full rounded-xl mt-[20px]" />
  )
})

export default InputName
