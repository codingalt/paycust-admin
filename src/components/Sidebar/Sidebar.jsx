import React, { useEffect, useRef, useState } from "react";
import css from "./Sidebar.module.scss";
import { NavLink } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { BiCategory } from "react-icons/bi";
import { MdOutlineStoreMallDirectory } from "react-icons/md";
import { LuUsers2 } from "react-icons/lu";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import { AiOutlineTags } from "react-icons/ai";
import useClickOutside from "@/hooks/useClickOutside";
import logo from "@/assets/logo.svg";
import { Image } from "@nextui-org/react";

const links = [
  {
    id: 1,
    label: "Dashboard",
    to: "/admin/dashboard",
    icon: <GoHome />,
  },
  {
    id: 2,
    label: "Categories",
    to: "/admin/categories",
    icon: <MdOutlineStoreMallDirectory />,
  },
  {
    id: 3,
    label: "Sub Categories",
    to: "/admin/subCategories",
    icon: <BiCategory />,
  },
  {
    id: 4,
    label: "Tags",
    to: "#",
    icon: <AiOutlineTags />,
  },
  {
    id: 5,
    label: "Businesses",
    to: "/admin/businesses",
    icon: <LiaBusinessTimeSolid />,
  },
  {
    id: 6,
    label: "Users",
    to: "/admin/users",
    icon: <LuUsers2 />,
  },
];

const Sidebar = ({ activeSidebar, setActiveSidebar, buttonRef }) => {
  const [pathname, setPathname] = useState(window.location.pathname);
  const sidebarRef = useRef();

  useEffect(() => {
    const handlePathnameChange = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", handlePathnameChange);
    return () => window.removeEventListener("popstate", handlePathnameChange);
  }, []);

  useClickOutside(sidebarRef, () => setActiveSidebar(false), buttonRef);

  return (
    <div
      className={`border-r z-[999] border-gray-200 shadow h-screen top-0 fixed inset-y-0 left-0 transform ${
        activeSidebar ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-400 ease-in-out md:flex md:h-screen bg-white`}
      ref={sidebarRef}
    >
      <aside className="w-64 bg-white">
        <div className="h-16 flex items-center justify-center pt-3 space-x-2">
          <div className="w-7">
            <Image src={logo} width={28} height={28} />
          </div>
          <span className="text-[16px] font-bold text-[#53AC91]">HINT APP</span>
        </div>
        <ul className="py-7 px-0">
          {links?.map((item) => (
            <li
              key={item.id}
              className={`flex items-center mb-1.5 px-3 py-2 mx-6 rounded-lg transition-all ${
                window.location.pathname.startsWith(item.to)
                  ? "bg-[#DEFFDD] hover:bg-[#DEFFDD]"
                  : "hover:bg-[#f7f7f7] hover:bg-opacity-80"
              }`}
            >
              <NavLink
                style={{ textDecoration: "none" }}
                className={`flex items-center space-x-3 ${
                  window.location.pathname.startsWith(item.to)
                    ? "text-[#53AC91]"
                    : "text-gray-800"
                } decoration-0`}
                to={item.to}
              >
                <div
                  className={`text-[18px] m-0 ${
                    window.location.pathname.startsWith(item.to)
                      ? "text-[#53AC91]"
                      : "text-gray-600"
                  }`}
                >
                  {item.icon}
                </div>
                <span className="text-md m-0 decoration-0 font-medium">
                  {item.label}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
