import React, { useState, useEffect } from "react";
import { NavLink, useNavigate,Link  } from "react-router-dom";
import "../styles/main.css";
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
    const navigate = useNavigate();
  
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
            <NavLink to="/home" className="nav-link  " variant="text">HOME</NavLink>
              
      <ul className="main-navigation">
      <li>
        <NavLink to="/collections" className="nav-link">
          COLLECTIONS
        </NavLink>
        <ul>
          {categories &&
            categories.map((category) => (
              <li key={category._id} onMouseEnter={() => setCategoryId(category._id)} onMouseLeave={() => setCategoryId(null)}>
                {category.category_name}
            
        {categoryId && (
          <ul>
            {filtered && filtered.map((subcategory) => (
                <li key={subcategory._id} onClick={() => {
                  setQuery(`${subcategory.subcategory_name}`);
                  navigate(`/collections`);
                }}>  {subcategory.subcategory_name}</li>
              ))}
          </ul>
        )}
          </li>
            ))}
        </ul>
      </li>
    </ul>

          <NavLink to="/about us" className="nav-link  " variant="text">ABOUT US</NavLink>
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
            <div className='cursor-pointer' onClick={() => navigate('/cart')}>  <IoBagOutline /></div>
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
