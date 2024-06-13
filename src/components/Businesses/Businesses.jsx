import React from 'react'
import css from "./Businesses.module.scss"
import Cards from './Cards';

const Businesses = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.top}>Registered Businesses on Paycust</div>

      <Cards />
    </div>
  );
}

export default Businesses