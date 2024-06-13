import React, { useRef, useState } from 'react'
import css from "./Layout.module.scss"
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';

const Layout = ({ children }) => {
  const [activeSidebar, setActiveSidebar] = useState(false);
  const buttonRef = useRef();

  return (
    <div className={css.wrapper}>
      <div className={css.sidebarWrap}>
        <Sidebar
          activeSidebar={activeSidebar}
          setActiveSidebar={setActiveSidebar}
          buttonRef={buttonRef}
        />
      </div>
      <div className={css.dashboard}>
        <Header
          activeSidebar={activeSidebar}
          setActiveSidebar={setActiveSidebar}
          buttonRef={buttonRef}
        />
        <div className={css.content}>{children}</div>
      </div>
    </div>
  );
};

export default Layout