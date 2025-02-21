import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export function addToWishList(productId) {
  let token = localStorage.getItem("token");
  return axios.post(
    `https://ecommerce.routemisr.com/api/v1/wishlist`,
    { productId },
    {
      headers: {
        token,
      },
    }
  );
}
export function deleteFromWishList(id) {
  let token = localStorage.getItem("token");
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
    headers: {
      token,
    },
  });
}

export default function useMutatioWishList(fn) {
  return useMutation({
    mutationFn: fn,
  });
}
