import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export function getUserCart() {
  let token = localStorage.getItem("token");
  return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
    headers: {
      token,
    },
  });
}

export default function useQueryCart(fn) {
  return useQuery({
    queryKey: ["userCart"],
    queryFn: fn,
    select: (data) => data.data,
    refetchInterval: 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
