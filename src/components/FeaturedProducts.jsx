import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Loading from "./Loading.jsx";
import CardItem from "./CardItem.jsx";
import { useQuery } from "@tanstack/react-query";
import useProducts from "../Hooks/useProducts";
import useQueryWishList from "../Hooks/useQueryWishList.jsx";

export default function FeaturedProducts() {
  // check if item in wish list to color heart

  let { data: dataWishList, isPending: isPendingGetWishList } =
    useQueryWishList();

  let { data, isError, isLoading, error } = useProducts();
  if (isError) {
    return (
      <>
        <h1 className="text-center">{error.message}</h1>
      </>
    );
  }

  return (
    <>
      <div className="container">
        <div className="flex mt-6 flex-wrap gap-y-4 pb-10">
          {isLoading ? (
            <Loading />
          ) : (
            data.map(function (prod) {
              return (
                <CardItem
                  key={prod._id}
                  wishList={dataWishList?.map((prod) => {
                    return prod._id;
                  })}
                  prod={prod}
                />
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
