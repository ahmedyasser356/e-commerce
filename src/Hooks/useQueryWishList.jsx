import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useQueryWishList() {
  function getWishList() {
    let token = localStorage.getItem("token");
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
      headers: {
        token,
      },
    });
  }

  return useQuery({
    queryKey: ["getWishList"],
    queryFn: getWishList,
    select: (data) => data?.data.data,
    refetchInterval: 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
