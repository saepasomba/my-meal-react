import React from 'react'
import style from './Searchbar.module.css'

export default function Searchbar({ onChange }) {
  return (
    <div className={`container ${style.searchbarContainer}`}>
      <input type='text' placeholder='Search...' onChange={onChange}></input>
    </div>
  )
}
