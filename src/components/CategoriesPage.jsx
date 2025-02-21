import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet";
import Loader2 from "./Loader2";
import SubCategories from "./SubCategories";

export default function CategoriesPage() {
  // get all categories
  let { data, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: () =>
      axios.get(`https://ecommerce.routemisr.com/api/v1/categories`),
    select: (data) => data?.data?.data,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  // scroll to down div
  function scrollToDownDiv() {
    scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }

  let [showSub, setShowSub] = useState(false);
  let [id, setid] = useState(``);
  let [catName, setCatName] = useState(``);

  return (
    <>
      <Helmet>
        <title>Categories Page</title>
      </Helmet>

      {isLoading ? (
        <Loader2></Loader2>
      ) : (
        <div className="categories-box flex gap-y-5  my-8 mb-6 flex-wrap">
          {data?.map((category) => {
            return (
              <div className="category-item px-2 lg:w-1/4 sm:w-1/2 w-full md:w-1/3  ">
                <div
                  onClick={() => {
                    setCatName(category.name);
                    setid(category._id);
                    setShowSub(true);
                    scrollToDownDiv();
                  }}
                  className="inner dark:hover:scale-105 hover:cursor-pointer hover:shadow-2xl duration-300   overflow-hidden border border-gray-300 rounded-lg"
                >
                  <img
                    src={category.image}
                    className="h-60  w-full object-cover"
                    alt=""
                  />
                  <h4 className="text-center text-h5 dark:text-green-400  text-green-600 font-extrabold py-4">
                    {category.name}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* subcategories */}

      {showSub ? (
        <SubCategories catName={catName} id={`${id}`}></SubCategories>
      ) : (
        ``
      )}
    </>
  );
}
