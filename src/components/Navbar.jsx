import React, { useContext, useEffect, useRef, useState } from "react";
import logo from "../assets/images/freshcart-logo.svg";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { userToken } from "../Context/UserTocken";
import { numOfCartItemsContext } from "../Context/NumOfCartItems";
export default function Navbar() {
  let { isLogin, setLogin } = useContext(userToken);
  let navigate = useNavigate();

  // num of cart items
  let { numOfCartItems, setNumOfCartItems } = useContext(numOfCartItemsContext);

  function handleLogOut() {
    localStorage.removeItem("token");
    setLogin("");
    navigate("/");
  }
  let [mode, setMode] = useState("Light");
  let ref = useRef(null);

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      document.body.classList.add("dark");
      ref.current.checked = true;
      setMode("Dark");
    }
  }, []);

  function handleDarkMode(e) {
    let body = document.body;
    if (ref.current.checked) {
      body.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setMode("Dark");
    } else {
      body.classList.remove("dark");
      localStorage.removeItem("theme");
      setMode("Light");
    }
  }

  return (
    <nav className="bg-light-color dark:shadow-2xl border-b-[1px]  dark:bg-gray-900 dark:border-b-[1px] dark:border-b-gray-700">
      <div className=" max-w-screen-xl flex flex-wrap items-center  justify-between lg:justify-start mx-auto p-4 md:container">
        <Link
          to={""}
          className="flex items-center me-7 space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="" alt=" freshcart Logo" />
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 
          focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        {isLogin ? (
          <div
            className=" hidden w-full   md:justify-between grow lg:flex lg:w-auto"
            id="navbar-default"
          >
            <ul
              className="text-base lg:items-baseline rounded-lg font-medium flex flex-col p-4 lg:p-0 mt-4  *:hover:cursor-pointer lg:flex-row lg:space-x-5 
          rtl:space-x-reverse lg:mt-0 lg:border-0  dark:bg-gray-800 lg:dark:bg-gray-900 "
            >
              <li>
                <Link
                  to={""}
                  className="block py-2 px-3   dark:hover:text-black  lg:dark:hover:text-main-color  rounded-sm lg:bg-transparent lg:hover:text-main-color  lg:hover:bg-transparent
                 hover:bg-white  lg:p-0 dark:text-white  "
                  aria-current="page"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to={"/products"}
                  className="block py-2 px-3  dark:hover:text-black  lg:dark:hover:text-main-color text-gray-900 rounded-sm hover:bg-white lg:hover:bg-transparent  lg:hover:text-main-color 
                lg:p-0 dark:text-white     
                lg:dark:hover:bg-transparent"
                >
                  Products
                </Link>
              </li>

              <li>
                <Link
                  to={"/wishlist"}
                  className="block py-2 px-3  dark:hover:text-black  lg:dark:hover:text-main-color text-gray-900 rounded-sm hover:bg-white lg:hover:bg-transparent  lg:hover:text-main-color 
                lg:p-0 dark:text-white     
                lg:dark:hover:bg-transparent"
                >
                  Wish List
                </Link>
              </li>

              <li>
                <Link
                  to={"/categories"}
                  className="block py-2 px-3  dark:hover:text-black  lg:dark:hover:text-main-color text-gray-900 rounded-sm hover:bg-white lg:hover:bg-transparent  lg:hover:text-main-color 
                lg:p-0 dark:text-white   
                lg:dark:hover:bg-transparent"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to={"/brands"}
                  className="block py-2 px-3  dark:hover:text-black  lg:dark:hover:text-main-color text-gray-900 rounded-sm hover:bg-white lg:hover:bg-transparent  lg:hover:text-main-color 
                lg:p-0 dark:text-white   
                lg:dark:hover:bg-transparent"
                >
                  Brands
                </Link>
              </li>

              <li>
                <Link
                  to={"/cart"}
                  className="block py-2 px-3  dark:hover:text-black  lg:dark:hover:text-main-color  text-gray-900 rounded-sm hover:bg-white lg:hover:bg-transparent  lg:hover:text-main-color 
                lg:p-0 dark:text-white  
                 lg:dark:hover:bg-transparent"
                >
                  Cart
                </Link>
              </li>
              <li className="flex justify-center">
                <Link to={"/cart"}>
                  <i className="fa-solid shop-cart    dark:text-white relative text-gray-700 px-2 lg:mt-0 mt-2 fa-shopping-cart text-2xl">
                    <div className="nums-cart absolute size-5 bg-main-color flex justify-center   items-center text-white top-0 right-0 rounded text-[11px] translate-x-[30%] translate-y-[-30%]">
                      {numOfCartItems}
                    </div>
                  </i>
                </Link>
              </li>
            </ul>
            <ul
              className="text-base ms-auto lg:items-baseline rounded-lg font-medium flex flex-col p-4 lg:p-0 mt-4  *:hover:cursor-pointer lg:flex-row lg:space-x-5 
          rtl:space-x-reverse lg:mt-0 lg:border-0  dark:bg-gray-800 lg:dark:bg-gray-900 "
            >
              {isLogin ? (
                <li>
                  <span
                    className="block py-2 px-3  dark:hover:text-black  lg:dark:hover:text-main-color text-gray-900 rounded-sm hover:bg-white lg:hover:bg-transparent  lg:hover:text-main-color 
                   lg:p-0 dark:text-white   
                   lg:dark:hover:bg-transparent"
                    onClick={handleLogOut}
                  >
                    Logout
                  </span>
                </li>
              ) : (
                <>
                  <li>
                    <Link
                      to={"/login"}
                      className="hover:text-main-color dark:hover:text-main-color dark:text-white"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/register"}
                      className="hover:text-main-color dark:hover:text-main-color dark:text-white"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}

              <li className="flex justify-center mt-2 lg:inline-block">
                <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input
                    type="checkbox"
                    name="toggle"
                    ref={ref}
                    onChange={handleDarkMode}
                    id="toggle"
                    class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  />
                  <label
                    for="toggle"
                    class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                  ></label>
                </div>
                <label
                  for="toggle"
                  class="text-[14px] dark:text-white text-gray-700"
                >
                  {mode}
                </label>
              </li>
            </ul>
          </div>
        ) : (
          <div
            className=" hidden w-full   md:justify-between grow lg:flex lg:w-auto"
            id="navbar-default"
          >
            <ul
              className="text-base lg:items-baseline rounded-lg font-medium flex flex-col p-4 lg:p-0 mt-4  *:hover:cursor-pointer lg:flex-row lg:space-x-5 
          rtl:space-x-reverse lg:mt-0 lg:border-0 lg:ms-auto dark:bg-gray-800 lg:dark:bg-gray-900 "
            >
              <li>
                <Link
                  to={"/login"}
                  className="block py-2 px-3  dark:hover:text-black  lg:dark:hover:text-main-color text-gray-900 rounded-sm hover:bg-white lg:hover:bg-transparent  lg:hover:text-main-color 
                lg:p-0 dark:text-white   
                lg:dark:hover:bg-transparent"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to={"/register"}
                  className="block py-2 px-3  dark:hover:text-black  lg:dark:hover:text-main-color text-gray-900 rounded-sm hover:bg-white lg:hover:bg-transparent  lg:hover:text-main-color 
                  lg:p-0 dark:text-white   
                  lg:dark:hover:bg-transparent"
                >
                  Register
                </Link>
              </li>
              <li className="flex justify-center mt-2 lg:inline-block">
                <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input
                    type="checkbox"
                    name="toggle"
                    ref={ref}
                    onChange={handleDarkMode}
                    id="toggle"
                    class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  />
                  <label
                    for="toggle"
                    class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                  ></label>
                </div>
                <label
                  for="toggle"
                  class="text-[14px] dark:text-white text-gray-700"
                >
                  {mode}
                </label>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
