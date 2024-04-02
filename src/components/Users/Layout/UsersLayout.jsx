import React from 'react'
import css from "./UsersLayout.module.scss"
import UsersSidebar from '../Sidebar/UsersSidebar';
import UsersHeader from '../Header/UsersHeader';

const UsersLayout = ({ children }) => {
  return (
    <div className={css.wrapper}>
      <div className={css.sidebarWrap}>
        <UsersSidebar />
      </div>
      <div className={css.dashboard}>
        <UsersHeader />
        <div className={css.content}>{children}</div>
      </div>
    </div>
  );
};

export default UsersLayout