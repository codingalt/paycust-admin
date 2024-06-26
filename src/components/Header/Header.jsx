import React, { useState } from "react";
import css from "./Header.module.scss";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa6";
import { useMediaQuery } from "@uidotdev/usehooks";
import Avvvatars from "avvvatars-react";
import { useSelector } from "react-redux";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { BsThreeDots } from "react-icons/bs";
import { useMainContext } from "@/context/MainContext";

const Header = ({ activeSidebar, setActiveSidebar, buttonRef }) => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const { setSearchQuery } = useMainContext();

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
  };

  const handleLogout = () => {
    localStorage.removeItem("paycustTokenAdmin");
    window.location.reload(false);
  };

  return (
    <header className={`${css.Header} border-b border-gray-200`}>
      <div className={`${css.header_left} flex items-center gap-2`}>
        <div className={css.searchBox}>
          <CiSearch />
          <input
            onKeyUp={handleChange}
            type="text"
            placeholder="Search something..."
          />
        </div>
      </div>

      <div className={css.header_right}>
        <div className="flex items-center -space-x-2.5">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <div className={`${css.profile}`}>
                <Avvvatars value={user?.name} size={isSmallDevice ? 36 : 35} />
                <span>{user?.name}</span>
                <FaChevronDown />
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user?.email}</p>
              </DropdownItem>
              <DropdownItem onClick={handleLogout} key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <div
            ref={buttonRef}
            onClick={() => isSmallDevice && setActiveSidebar(!activeSidebar)}
            className="md:hidden border-1 border-[#6A6A6A] rounded-full w-9 h-9 flex items-center justify-center text-[21px] text-[#211D1D]"
          >
            <BsThreeDots />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
