import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export function addToCart(productId) {
  let x = localStorage.getItem("token");
  return axios.post(
    "https://ecommerce.routemisr.com/api/v1/cart",
    { productId },
    {
      headers: {
        token: x,
      },
    }
  );
}

export function deleteCart(c) {
  let x = localStorage.getItem("token");
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${c}`, {
    headers: {
      token: x,
    },
  });
}

export function ClearAllCart() {
  let token = localStorage.getItem("token");
  return axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
    headers: {
      token,
    },
  });
}

// update count
export function updateCount({ id, count }) {
  let token = localStorage.getItem("token");
  return axios.put(
    `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    { count },
    { headers: { token } }
  );
}

export default function useMutationCart(fn) {
  return useMutation({ mutationFn: fn });
}
