import React from "react";
import css from "./StoreSidebar.module.scss";
import { NavLink } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { MdOutlineStoreMallDirectory } from "react-icons/md";
import { MdPhotoSizeSelectSmall } from "react-icons/md";
import { SiBrandfolder } from "react-icons/si";
import { LiaWeightSolid } from "react-icons/lia";
import { MdOutlineDiscount } from "react-icons/md";
import { CiDiscount1 } from "react-icons/ci";
import { TbShoppingBagDiscount } from "react-icons/tb";

const StoreSidebar = () => {
  return (
    <div className={css.sidebar}>
      <div className="flex h-screen bg-gray-200 dark:bg-gray-900">
        <aside className="w-64 bg-white border-1 dark:from-gray-800 dark:to-gray-700">
          <div className="h-16 flex items-center justify-center border-b-2">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Admin Store
            </h2>
          </div>
          <ul className="py-2 px-0">
            <li className="flex items-center px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-700">
              <NavLink
                style={{ textDecoration: "none" }}
                className="flex items-center space-x-3 text-gray-800 decoration-0"
                to="/admin/store/dashboard"
              >
                <GoHome className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-md decoration-0 font-medium">
                  Dashboard
                </span>
              </NavLink>
            </li>

            <li className="flex items-center px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-700">
              <NavLink
                style={{ textDecoration: "none" }}
                className="flex items-center space-x-3 text-gray-800"
                to="/admin/store/globalCategories"
              >
                <MdOutlineStoreMallDirectory className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-md font-medium">Global Categories</span>
              </NavLink>
            </li>

            <li className="flex items-center px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-700">
              <NavLink
                style={{ textDecoration: "none" }}
                className="flex items-center space-x-3 text-gray-800"
                to="/admin/store/subGlobalCategories"
              >
                <BiCategory className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-md font-medium">
                  Sub Global Categories
                </span>
              </NavLink>
            </li>

            <li className="flex items-center px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-700">
              <NavLink
                style={{ textDecoration: "none" }}
                className="flex items-center space-x-3 text-gray-800"
                to="/admin/store/features"
              >
                <MdOutlineFeaturedPlayList className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-md font-medium">Features</span>
              </NavLink>
            </li>

            <li className="flex items-center px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-700">
              <NavLink
                style={{ textDecoration: "none" }}
                className="flex items-center space-x-3 text-gray-800"
                to="/admin/store/brands"
              >
                <SiBrandfolder className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-md font-medium">Brands</span>
              </NavLink>
            </li>

            <li className="flex items-center px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-700">
              <NavLink
                style={{ textDecoration: "none" }}
                className="flex items-center space-x-3 text-gray-800"
                to="/admin/store/sizes"
              >
                <MdPhotoSizeSelectSmall className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-md font-medium">Sizes</span>
              </NavLink>
            </li>

            <li className="flex items-center px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-700">
              <NavLink
                style={{ textDecoration: "none" }}
                className="flex items-center space-x-3 text-gray-800"
                to="/admin/store/weights"
              >
                <LiaWeightSolid className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-md font-medium">Weights</span>
              </NavLink>
            </li>

            <li className="flex items-center px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-700">
              <NavLink
                style={{ textDecoration: "none" }}
                className="flex items-center space-x-3 text-gray-800"
                to="/admin/store/deals"
              >
                <TbShoppingBagDiscount className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-md font-medium">Deals</span>
              </NavLink>
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
};

export default StoreSidebar;
