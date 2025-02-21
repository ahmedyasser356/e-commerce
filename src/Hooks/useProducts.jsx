import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useProducts() {
  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    select: (data) => {
      return data?.data?.data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
