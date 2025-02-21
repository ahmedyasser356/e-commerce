import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import Loader2 from "./Loader2";
import { useQuery } from "@tanstack/react-query";

export default function Categories() {
  let { data, isError, isLoading, error } = useQuery({
    queryKey: ["category"],
    queryFn: () =>
      axios.get(`https://ecommerce.routemisr.com/api/v1/categories`),
    select: (data) => data?.data?.data,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
  };
  if (isError) {
    return (
      <>
        <h1 className="text-center">{error.message}</h1>
      </>
    );
  }
  return (
    <>
      {isLoading ? (
        <Loader2></Loader2>
      ) : (
        <Slider className="mb-6 hidden md:flex justify-between" {...settings}>
          {data?.map(function (item) {
            return (
              <>
                <div className=" text-center">
                  <img
                    src={item.image}
                    className="h-[200px] px-2 mx-auto mb-1 object-cover"
                    alt=""
                  />
                  <p>{item.name}</p>
                </div>
              </>
            );
          })}
        </Slider>
      )}
    </>
  );
}
