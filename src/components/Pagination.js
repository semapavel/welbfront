/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react'
import styles from "../style/pagination.module.sass";

export default function Pagination({
  travelsPerPage,
  totalTravels,
  setCurrentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalTravels / travelsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className={styles.pagination}>
      {pageNumbers.map((number) => (
        <li
          className={styles.pag__item}
          key={number}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </li>
      ))}
    </ul>
  );
}
