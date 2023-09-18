import React from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick} className={` rounded-xl text-white bg-customPrimary w-full px-[10px] py-[8px]  ${props.btnCSS}`}>{props.btnName}</button>
  )
}

export default Button
