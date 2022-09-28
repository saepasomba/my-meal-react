import React from 'react'
import './CategoryList.css'

export default function CategoryList({ categories, onClick, isActive }) {
  return (
    <div className='category-list'>
      {
        ['All', ...categories].map(category => {
          return (
            <div className={`category ${isActive === category ? 'active' : ''}`} onClick={() => onClick(category)}>
              {category}
            </div>
          )
        })
      }
    </div>
  )
}
