import React from 'react'
import css from "./Users.module.scss";
import { UserTable } from './UserTable';

const Users = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.top}>Users</div>

      <div className="w-full max-w-screen-lg">
        <UserTable />
      </div>
    </div>
  );
}

export default Users