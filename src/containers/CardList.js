import React from 'react'
import style from './CardList.module.css'

export default function CardList(props) {
  return (
    <div className={`container ${style.cardList}`}>
        {props.children}
    </div>
  )
}
