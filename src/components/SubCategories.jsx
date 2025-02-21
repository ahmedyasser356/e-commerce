import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Loader2 from "./Loader2";

export default function SubCategories({ id, catName }) {
  function getSubcategories() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
    );
  }

  let { data, isLoading, isFetching } = useQuery({
    queryKey: ["subcategories", id],
    queryFn: getSubcategories,
    select: (data) => data?.data.data,
  });

  if (isLoading || isFetching) {
    return <Loader2></Loader2>;
  }

  return (
    <>
      <h1 className="text-main-color text-h3 text-center font-extralight">
        {catName} Subcategories
      </h1>
      <div className="subcategory-box flex gap-y-5  my-8 mb-6 flex-wrap">
        {data?.map((sub) => {
          return (
            <div className="sub-item px-2 lg:w-1/4 sm:w-1/2 w-full md:w-1/3">
              <div className="inner hover:shadow-2xl duration-300 flex justify-center items-center h-24  overflow-hidden border border-gray-300 rounded-md">
                <p className="text-lg text-center px-6">{sub.name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
