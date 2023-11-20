import { React, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  DASHBOARD_SIDEBAR_LINKS,
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
  SidebarReducedLink,
} from "../../lib/consts/navigation";
import classNames from "classnames";
import { TbLogout } from "react-icons/tb";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
const linkClasses =
  "flex justify-start  w-full gap-2 font-light px-3 py-4 hover:bg-gradient-to-r from-cyan-700 to-cyan-1000 hover:no-underline active:bg-cyan-700 rounded-sm text-base";

export default function Sidebar() {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  };
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLargeMenuOpen, setLargeMenuOpen] = useState(true);

  return (
    <div
      className={`flex justify-between flex-col pl-0  md:flex-col md:rounded-r-3xl  bg-gradient-to-b from-black to-gray-700  p-3  text-white ${
        isLargeMenuOpen ? "lg:w-60" : "md:w-15"
      }`}
    >
      <div className="flex flex-row text-cyan-500 justify-between items-center  md:pt-0 h-20 ml-5 text-2xl">
        <span
          className={`font-VarelaRound   ${
            isLargeMenuOpen
              ? "transition duration-300 ease-in-out"
              : "md:hidden"
          }`}
        >
          PRESTIGIOUS
        </span>
        <span
          className={`font-VarelaRound flex flex-col justify-between ${
            isLargeMenuOpen
              ? "hidden transition duration-300 ease-in-out"
              : "hidden md:inline-block"
          }`}
        >
          P
        </span>
        {/* Toggle button for small screens */}
        <div className="flex md:hidden justify-end items-center">
          <button
            onClick={() => setMenuOpen(!isMenuOpen)}
            className="text-white text-2xl cursor-pointer"
          >
            <RxHamburgerMenu />
          </button>
        </div>
        <div className="hidden flex  md:flex justify-end">
          <button
            onClick={() => setLargeMenuOpen(!isLargeMenuOpen)}
            className="text-white text-2xl cursor-pointer"
          >
            {isLargeMenuOpen ? <IoIosArrowBack /> : <IoIosArrowForward />}
          </button>
        </div>
      </div>

      {/* Sidebar content for medium and large screens */}
      <div
        className={`hidden md:flex  md:flex-col  flex-col h-full justify-between ${
          isLargeMenuOpen
            ? "block transition duration-300 ease-in-out"
            : "md:hidden"
        }`}
      >
        <div className={` md:flex lg:flex py-8 flex flex-col gap-0.7`}>
          {DASHBOARD_SIDEBAR_LINKS.map((item) => (
            <SidebarLink key={item.key} item={item} />
          ))}
        </div>

        <div className={`hidden md:flex flex-col gap-0.5 pt-4`}>
          {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
            <SidebarLink key={item.key} item={item} />
          ))}

          <button
            onClick={handleLogout}
            className={classNames(" cursor-pointer", linkClasses)}
          >
            <span className="text-2xl px-2">
              <TbLogout className="text-red" />
            </span>
            Logout
          </button>
        </div>
      </div>

      {/* Sidebar content for small screens (dropdown) */}
      <div
        className={`md:hidden flex flex-row pt-10 justify-center gap-0.5 ${
          isMenuOpen ? "block transition duration-300 ease-in-out" : "hidden"
        }`}
      >
        <div
          className="flex flex-col justify-center w-full "
          onClick={() => setMenuOpen(!isMenuOpen)}
        >
          {DASHBOARD_SIDEBAR_LINKS.map((item) => (
            <SidebarLink key={item.key} item={item} />
          ))}

          <button
            onClick={handleLogout}
            className={classNames(" cursor-pointer", linkClasses)}
          >
            <span className="text-2xl px-2">
              <TbLogout className="text-red" />
            </span>
            Logout
          </button>
        </div>
      </div>

      {/* Sidebar reduced content for medium and large screens */}
      <div
        className={`flex  flex-col h-full justify-between ${
          isLargeMenuOpen
            ? "hidden transition duration-300 ease-in-out"
            : "inline-block"
        }`}
      >
        <div
          className={` text-center md:flex lg:flex py-8 flex flex-col gap-0.7`}
        >
          {DASHBOARD_SIDEBAR_LINKS.map((link) => (
            <SidebarReducedLink key={link.key} item={link} />
          ))}
        </div>

        <div className={`hidden md:flex flex-col gap-0.5 pt-4`}>
          {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
            <SidebarReducedLink key={link.key} item={link} />
          ))}

          <button
            onClick={handleLogout}
            className={classNames(" cursor-pointer", linkClasses)}
          >
            <span className="text-2xl px-1.5">
              <TbLogout className="text-red" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function SidebarLink({ item }) {
  const { pathname } = useLocation();

  return (
    <Link
      to={item.path}
      className={classNames(
        pathname === item.path
          ? "flex justify-start backdrop-blur w-full bg-gradient-to-r from-cyan-500 to-gray-1000    text-white"
          : "text-white",
        linkClasses
      )}
    >
      <span className="text-2xl px-2">{item.icon}</span>
      {item.label}
    </Link>
  );
}
