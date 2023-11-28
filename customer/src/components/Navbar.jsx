import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/main.css";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoBagOutline } from "react-icons/io5";
import { TbHeart } from "react-icons/tb";
import { FaUserCircle } from "react-icons/fa";


function Navbar() {
    const [search, setSearch] = useState(false)
  return (
    <div className="primary-bg">
    <div className="box primary-bg">
      <div>
        <div className="mb-10 pt-6  ">
          <nav className="flex justify-between items-center">

            <div className="font-bold text-3xl ">
              <span>PREST</span>
              <span className="secondary-bg">IGIOUS</span>
            </div>

            <div className="font-bold flex justify-between gap-5">
              <NavLink to="/home" className="nav-link ">HOME</NavLink>
              <NavLink to="/collections" className="nav-link ">COLLECTIONS</NavLink>
              <NavLink to="/about us" className="nav-link ">ABOUT US</NavLink>
            </div>

            <div className="icon-size flex justify-between items-center gap-4 ml-20">
            <div className="cursor-pointer">  
            {!search && <CiSearch className="secondary-bg" onClick={() =>setSearch(true)}/>}
            {search && (
  <div className="relative">
    <input
      type="text"
      placeholder="Search product"
      className="primary-bg w-40 h-10 pl-10  border-2  border-white rounded text-sm"
      
    />
    <CiSearch className="secondary-bg absolute left-1.5 top-3.5"/>
  </div>
)}

            </div>
            <div>  <IoBagOutline /></div>
            <div>  <TbHeart /></div>
            <div>  <FaUserCircle /></div>
            </div>

          </nav>
        </div>
        <hr />
      </div>
    </div>
    </div>
  );
}

export default Navbar;
