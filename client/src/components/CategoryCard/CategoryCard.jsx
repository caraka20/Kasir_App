import React from 'react'

const CategoryCard = (props) => {
  return (
    <div className='w-[100px] h-[100px] rounded-2xl bg-white flex flex-col justify-center items-center cursor-pointer'>
        <div className={`text-4xl ${props.iconsCSS}`}>{props.icons}</div>
        <div className={`font-normal ${props.categoryCSS}`}>{props.categoryName}</div>
    </div>
  )
}

export default CategoryCard
