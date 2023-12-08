import React, { useState, Fragment, useEffect } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { Transition, Menu } from "@headlessui/react";
import "../styles/main.css";
import { CiSearch } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { PiBagThin } from "react-icons/pi";
import { IoIosArrowForward } from "react-icons/io";
import { PiUserThin } from "react-icons/pi";
import classNames from "classnames";
import { logout } from "../Redux/slicers/AUTH/authServices";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductFound } from "../Redux/slicers/Product/productServices";
import { fetchCategories } from "../Redux/slicers/Category/categoryServices";
import { fetchSubcategories } from "../Redux/slicers/Subcategory/subcategoryServices";
import { removeProducts, addProducts } from "../Redux/slicers/productBySubcat";
import { fetchProduct } from "../Redux/slicers/Product/productServices";

function Navbar() {
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const dispatch = useDispatch();
  const [filtered, setFiltered] = useState([]);
  const categories = useSelector((state) => state.categories.categories);
  const products = useSelector((state) => state.product.product);
  const subcategories = useSelector(
    (state) => state.subcategories.subcategories
  );
  const navigate = useNavigate();
  const [productsBySubCategory, setProductsRelated] = useState([]);
  const customer = useSelector((state) => state.auth.customer);
  const [searchBySubCategory, setSubCategory] = useState("");

  const handleLogout = () => {
    dispatch(logout());
  };

  //Fetch products with category and subCategory
  useEffect(() => {
    if (searchBySubCategory && products) {
      const productsFiltred = products.filter(
        (product) => product.subcategoryName === searchBySubCategory
      );
      setProductsRelated(productsFiltred);
    }
  }, [searchBySubCategory, products]);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  useEffect(() => {
    dispatch(addProducts(productsBySubCategory));
  }, [dispatch, productsBySubCategory]);

  //Search
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
      const newFiltered = subcategories.filter(
        (subCategory) => subCategory.category_id._id === categoryId
      );
      setFiltered(newFiltered);
    } catch (error) {
      console.log("error inside useEffect subcategories");
    }
  }, [categoryId, subcategories]);

  return (
    <div className=" md:fixed w-full primary-bg z-10 ">
      <div className="box primary-bg">
        <div>
          <div className="py-6 ">
            <nav className="flex justify-between items-center">
              <div className="font-bold text-xl md:text-3xl ">
                <span>PREST</span>
                <span className="secondary-bg">IGIOUS</span>
              </div>

              <div className="font-bold flex flex-col md:flex-row justify-between gap-5">
                <NavLink to="/" className="nav-link  " variant="text">
                  HOME
                </NavLink>

                <ul className="">
                  <li>
                    <NavLink to="/collections" className="nav-link">
                      COLLECTIONS
                    </NavLink>
                    {categories && (
                      <ul className="categories-list">
                        {categories.map((category) => (
                          <li
                            key={category._id}
                            onMouseEnter={() => {
                              setCategoryId(category._id);
                            }}
                            onMouseLeave={() => setCategoryId(null)}
                          >
                            <span className="category-link">
                              <div className="flex flex-row justify-between">
                                <div>{category.category_name}</div>
                                <div className="flex flex-col justify-center ">
                                  <IoIosArrowForward className=" arrow invisible" />
                                </div>
                              </div>
                            </span>
                            {categoryId && (
                              <ul className="subcategories-list">
                                {filtered &&
                                  filtered.map((subcategory) => (
                                    <li
                                      key={subcategory._id}
                                      onClick={() => {
                                        setSubCategory(
                                          subcategory.subcategory_name
                                        );
                                        dispatch(removeProducts());
                                        navigate(
                                          `/${category.category_name}/${subcategory.subcategory_name}`
                                        );
                                      }}
                                    >
                                      {subcategory.subcategory_name}
                                    </li>
                                  ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                </ul>

                <NavLink to="/about us" className="nav-link  " variant="text">
                  ABOUT US
                </NavLink>
              </div>

              <div className="icon-size flex flex-row items-center   ml-20">
                <div className="cursor-pointer">
                  {!search && (
                    <CiSearch
                      className="secondary-bg text-2xl"
                      onClick={() => setSearch(true)}
                    />
                  )}
                  {search && (
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search product"
                        className="primary-bg w-40 h-10 pl-10  border-2  border-white rounded text-sm "
                        onChange={(e) => setQuery(e.target.value)}
                      />
                      <CiSearch className="secondary-bg absolute text-3xl left-1.5 top-3.5" />
                    </div>
                  )}
                </div>
                <div
                  className="cursor-pointer text-2xl pt-1"
                  onClick={() => navigate("/cart")}
                >
                  <div className="relative inline-block">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center">
                      {/* Replace this with your PiBagThin icon */}
                      <PiBagThin />
                    </div>
                    <span className="notif absolute top-2 right-1 flex items-center justify-center bg-black text-white rounded-full w-3 h-3 text-xs">
                      0
                    </span>
                  </div>
                </div>

                <div
                  className="cursor-pointer text-2xl pt-1"
                  onClick={() => navigate("/favorites")}
                >
                  <div className="relative inline-block">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center">
                      {/* Replace this with your PiBagThin icon */}
                      <CiHeart />
                    </div>
                    <span className="notif absolute top-2 right-1 flex items-center justify-center bg-black text-white rounded-full w-3 h-3 text-xs">
                      0
                    </span>
                  </div>
                </div>
                <div>
                  {" "}
                  {!customer ? (
                    <div
                    className="cursor-pointer text-2xl pt-1"
                    onClick={() => navigate("/login")}
                  >
                    <div className="relative inline-block">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center">
                        
                        <PiUserThin />
                      </div>
                      
                    </div>
                  </div>
                  ) : (
                    <Menu as="div" className="relative">
                      <div>
                        <Menu.Button className=" rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
                          <div
                            className="h-7 w-7 ml-1 rounded-full   bg-cover bg-no-repeat bg-center"
                            style={{
                              backgroundImage: `url(${
                                customer && customer.customer_image
                              })`,
                            }}
                          ></div>
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-36 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <div
                                className={classNames(
                                  active && "bg-gray-100",
                                  "text-sm text-gray-700 focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2"
                                )}
                                onClick={() =>
                                  navigate(`/profile/${customer._id}}`)
                                }
                              >
                                Your Profile
                              </div>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <div
                                className={classNames(
                                  active && "bg-gray-100",
                                  "text-sm text-gray-700 focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2"
                                )}
                                onClick={() => {
                                  handleLogout();
                                }}
                              >
                                Logout
                              </div>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  )}
                </div>
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
