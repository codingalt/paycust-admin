import React from 'react'
import css from "./StoreLayout.module.scss"
import StoreSidebar from '../Sidebar/StoreSidebar';
import StoreHeader from '../Header/StoreHeader';

const StoreLayout = ({ children }) => {
  return (
    <div className={css.wrapper}>
      <div className={css.sidebarWrap}>
        <StoreSidebar />
      </div>
      <div className={css.dashboard}>
        <StoreHeader />
        <div className={css.content}>{children}</div>
      </div>
    </div>
  );
};

export default StoreLayout