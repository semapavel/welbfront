/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react'
import styles from '../style/table.module.sass'

export default function Table({ columns, currentTravel }) {
  return (
    <table className={styles.table}>
      <tr className={styles.tableRow}>
        {columns.map((column, index) => (
          <th className={styles.tableRow} key={index}>
            {column}
          </th>
        ))}
      </tr>
      {currentTravel.map((elem) => (
        <tr className={styles.tableRow} key={elem.id}>
          <td className={styles.tableRow}>{elem.date}</td>
          <td className={styles.tableRow}>{elem.name}</td>
          <td className={styles.tableRow}>{elem.quant}</td>
          <td className={styles.tableRow}>{elem.dist}</td>
        </tr>
      ))}
    </table>
  );
}
