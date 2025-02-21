import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { userToken } from "../Context/UserTocken";

export default function Layout() {
  let [scrolly, setScrolly] = useState(0);
  window.addEventListener("scroll", function () {
    setScrolly(scrollY);
  });
  function scrollUp() {
    scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
      <div className="dark:bg-gray-900 min-h-screen pb-10 dark:text-white">
        <Navbar />
        <div className="container mt-2">
          <Outlet />
        </div>
        <span
          onClick={scrollUp}
          className={
            scrolly > 700
              ? `translate-x-[0%]   fixed transition-all duration-500 hover:cursor-pointer  bg-main-color rounded-md p-2 bottom-10 right-4`
              : `translate-x-[180%] fixed transition-all duration-500 hover:cursor-pointer  bg-main-color rounded-md p-2 bottom-5   right-4`
          }
        >
          <i class="fa-solid fa-chevron-up"></i>
        </span>
      </div>
    </>
  );
}
