import React from 'react'
import css from "./TaxiSidebar.module.scss";
import Sidebar from '@/components/ui/sidebar';
import { Link, NavLink } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { LuUsers2 } from "react-icons/lu";
import { RiFileList3Line } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoCarSportOutline } from "react-icons/io5";

const TaxiSidebar = () => {
  return (
    <div className={css.sidebar}>
      <div className="flex h-screen bg-gray-200 dark:bg-gray-900">
        <aside className="w-64 bg-white border-1 dark:from-gray-800 dark:to-gray-700">
          <div className="h-16 flex items-center justify-center border-b-2">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Admin Panel
            </h2>
          </div>
          <ul className="py-2 px-0">
            <li className="flex items-center px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-700">
              <NavLink
                style={{ textDecoration: "none" }}
                className="flex items-center space-x-3 text-gray-800 decoration-0"
                to="/admin/taxi/dashboard"
              >
                <GoHome className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-md decoration-0 font-medium">
                  Dashboard
                </span>
              </NavLink>
            </li>
            <li className="flex items-center px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-700">
              <Link
                style={{ textDecoration: "none" }}
                className="flex items-center space-x-3 text-gray-800"
                href="#"
              >
                <LuUsers2 className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-md font-medium">Users</span>
              </Link>
            </li>
            <li className="flex items-center px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-700">
              <NavLink
                style={{ textDecoration: "none" }}
                className="flex items-center space-x-3 text-gray-800"
                to="/admin/taxi/driverApplications"
              >
                <RiFileList3Line className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-md font-medium">Driver Requests</span>
              </NavLink>
            </li>
            <li className="flex items-center px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-700">
              <NavLink
                style={{ textDecoration: "none" }}
                className="flex items-center space-x-3 text-gray-800"
                to="/admin/taxi/vehicleApplications"
              >
                <IoCarSportOutline className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-md font-medium">Vehicle Applications</span>
              </NavLink>
            </li>
            <li className="flex items-center px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-700">
              <Link
                style={{ textDecoration: "none" }}
                className="flex items-center space-x-3 text-gray-800"
                href="#"
              >
                <CgProfile className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-md font-medium">Profile</span>
              </Link>
            </li>
            <li className="flex items-center px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-700">
              <NavLink
                style={{ textDecoration: "none" }}
                className="flex items-center space-x-3 text-gray-800"
                to="/"
              >
                <IoSettingsOutline className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-md font-medium">Home</span>
              </NavLink>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}

export default TaxiSidebar