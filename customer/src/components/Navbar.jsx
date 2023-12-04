import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/main.css";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoBagOutline } from "react-icons/io5";
import { TbHeart } from "react-icons/tb";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {fetchProductFound } from "../Redux/slicers/Product/productServices";
import { fetchCategories } from "../Redux/slicers/Category/categoryServices";
import { fetchSubcategories } from "../Redux/slicers/Subcategory/subcategoryServices";
import { IoIosArrowDown } from "react-icons/io";
import {  ChevronUpIcon } from "@heroicons/react/24/solid";
import {Menu,MenuHandler,MenuList,MenuItem,Button} from "@material-tailwind/react";

function Navbar() {
    const [search, setSearch] = useState(false);
    const [query, setQuery] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const dispatch = useDispatch();
    const [filtered, setFiltered] = useState([]);
    const categories = useSelector((state) => state.categories.categories);
    const subcategories = useSelector((state) => state.subcategories.subcategories);
    const [openMenu, setOpenMenu] = React.useState(false);

    useEffect(() => {
      dispatch(fetchProductFound(query));
    }, [dispatch, query]);

    useEffect(() => {
      dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
      dispatch(fetchSubcategories());
    }, [dispatch]);
    
    
    useEffect(() => {
        try {
          const newFiltered = subcategories.filter((subCategory) => subCategory.category_id._id === categoryId);
          setFiltered(newFiltered);
        } catch (error) {
          console.log("error inside useEffect subcategories");
        }
      
    }, [categoryId, subcategories]);
    console.log(categoryId);
    console.log(subcategories)
    console.log(filtered);
  return (
    <div className=" fixed w-full primary-bg z-10 ">
    <div className="box primary-bg">
      <div>
        <div className="mb-10 pt-6  ">
          <nav className="flex justify-between items-center">

            <div className="font-bold text-xl md:text-3xl ">
              <span>PREST</span>
              <span className="secondary-bg">IGIOUS</span>
            </div>

            <div className="font-bold flex flex-col md:flex-row justify-between gap-5">
              <NavLink to="/home" className="nav-link  " variant="text">Home</NavLink>
              <Menu>
      <MenuHandler>
        <Link  className="nav-link text-md " variant="text">Collections</Link>
      </MenuHandler>
      <MenuList>
        <Menu
          placement="right-start"
          open={openMenu}
          handler={setOpenMenu}
          allowHover
          offset={15}
        >
          <MenuHandler className="flex items-center justify-between">
            
            <MenuItem>
              <ChevronUpIcon
                strokeWidth={2.5}
                className={`h-3.5 w-3.5 transition-transform ${
                  openMenu ? "rotate-90" : ""
                }`}
                
              />
              
            </MenuItem>
          </MenuHandler>
          <MenuList>
            <NavLink to="/collections">Nested Item 1</NavLink>
          </MenuList>
        </Menu>
      </MenuList>
    </Menu>
              {/* <NavLink to="/collections" className="nav-link ">Collections <IoIosArrowDown className="mt-1" /> </NavLink>
              <ul className="flex flex-col relative top-6 z-20">
              {categories && categories.map((category) => (
                <li className="relative top-6 py-2 bg-green-900" key={category._id} onClick={()=>{setCategoryId(category._id)}}>
                  {category.category_name} 
                  
                  </li>
              ))}
              </ul>
              <ul className="bg-green-900">
                  {filtered && filtered.map((subcategory) => (
                    <li key={subcategory._id} onClick={() => setQuery(`${subcategory.subcategory_name}`)}>{subcategory.subcategory_name}</li>
                    ))}
                    </ul> */}
              <NavLink to="/about us" className="nav-link  " variant="text">About us</NavLink>
            </div>

            <div className="icon-size flex flex-row justify-between items-center gap-4 ml-20">
            <div className="cursor-pointer">  
            {!search && <CiSearch className="secondary-bg" onClick={() =>setSearch(true)}/>}
            {search && (
  <div className="relative">
    <input
      type="text"
      placeholder="Search product"
      className="primary-bg w-40 h-10 pl-10  border-2  border-white rounded text-sm"
      onChange={(e) => setQuery(e.target.value)}
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
