/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React from 'react'
import styles from '../style/button.module.sass'

export default function Button({ onClickButton, btnName }) {
  return (
    <button className={styles.button} onClick={onClickButton}>
      {btnName}
    </button>
  )
}
