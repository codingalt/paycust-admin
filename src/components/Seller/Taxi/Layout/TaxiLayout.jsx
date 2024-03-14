import React from 'react'
import css from "./TaxiLayout.module.scss"
import TaxiSidebar from '../Sidebar/TaxiSidebar'
import TaxiHeader from '../Header/TaxiHeader';

const TaxiLayout = ({ children }) => {
  return (
    <div className={css.wrapper}>
      <div className={css.sidebarWrap}>
        <TaxiSidebar />
      </div>
      <div className={css.dashboard}>
        <TaxiHeader />
        <div className={css.content}>{children}</div>
      </div>
    </div>
  );
};

export default TaxiLayout