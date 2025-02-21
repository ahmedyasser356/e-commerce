import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Helmet } from "react-helmet";
import Loader2 from "./Loader2";

export default function Brands() {
  function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  let { data, isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
    select: (data) => data?.data?.data,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  console.log(isLoading);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Brands Page</title>
      </Helmet>
      {isLoading ? (
        <Loader2></Loader2>
      ) : (
        <>
          <h2 className="text-h2 font-extrabold text-center my-6 text-main-color">
            All Brands
          </h2>
          <div className="brands-box flex gap-y-5  flex-wrap">
            {data?.map((brand) => {
              return (
                <div className="brand-item px-2   w-1/2 md:w-1/4  ">
                  <div className="inner hover:shadow-2xl duration-300 overflow-hidden border border-gray-400 rounded-lg">
                    <img src={brand.image} className="w-full" alt="" />
                    <p className="text-center py-4">{brand.name}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
