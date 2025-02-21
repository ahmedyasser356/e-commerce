import React, { useContext, useEffect, useState } from "react";
import { data, Link } from "react-router-dom";
import useMutationCart, { addToCart } from "../Hooks/useMutationCart";
import toast from "react-hot-toast";
import useMutatioWishList, { addToWishList } from "../Hooks/useMutatioWishList";
import useQueryWishList from "../Hooks/useQueryWishList";

export default function CartItem({ prod, wishList }) {
  let {
    imageCover,
    category,
    title,
    price,
    ratingsAverage,
    priceAfterDiscount,
    _id,
  } = prod;
  let {
    data,
    mutate,
    isError,
    isSuccess,
    error,
    isPending: isPendingAddToCart,
  } = useMutationCart(addToCart);
  // refetch get user cart context

  if (isSuccess && !isPendingAddToCart) {
    toast.success(data?.data?.message, {
      position: "top-right",
      style: { backgroundColor: "green", color: "white" },
      duration: 4000,
    });
  }
  if (isError) {
    toast.error(error.response.data.message);
  }
  // add to wish list
  let {
    data: dataAddToWish,
    mutate: mutateAddToWishList,
    isSuccess: isSuccessWish,
    isError: isErrorWish,
    error: errorWish,
    isPending: isPendingAddToWishList,
  } = useMutatioWishList(addToWishList);

  if (isErrorWish) {
    toast.error(errorWish.response.data.message);
  }

  if (isSuccessWish && !isPendingAddToWishList) {
    toast.success(dataAddToWish?.data?.message, {
      position: "top-right",
      style: { backgroundColor: "green", color: "white" },
      duration: 4000,
    });
  }

  return (
    <div className="product hover:shadow-xl rounded-lg duration-300 hover:cursor-pointer w-full sm:w-1/3   lg:w-1/4 p-3   ">
      <Link to={`/productdetails/${_id}/${category._id}`} className="inner ">
        <img src={imageCover} className="mb-2 rounded-t-lg" alt="" />

        <p className="text-[12px] font-bold text-main-color">{category.name}</p>
        <p className="font-semibold dark:text-white ">
          {title.split(" ").slice(0, 2).join(" ")}
        </p>
        <div className="flex justify-between mt-2 text-xs dark:text-white ">
          <p className={priceAfterDiscount ? `line-through` : ``}>
            {price} EGP
          </p>
          <p>
            <i className="fa-solid fa-star text-rating-color "></i>{" "}
            {ratingsAverage}
          </p>
        </div>
        {priceAfterDiscount ? (
          <p className="text-xs dark:text-white">{priceAfterDiscount} EGP</p>
        ) : (
          ``
        )}
      </Link>
      <div className="w-full flex justify-between items-baseline mt-4">
        <button
          onClick={function () {
            mutate(_id);
          }}
          className="btn w-[80%] bg-main-color  hover:bg-opacity-80 rounded-lg py-2  dark:text-white"
        >
          + Add
        </button>
        <i
          onClick={() => {
            mutateAddToWishList(_id);
          }}
          //                                                                 check if item in wish list to color heart
          className={`fa-solid fa-heart text-gray-500  text-[24px] ${
            wishList?.includes(_id) && "text-red-600"
          } `}
        ></i>
      </div>
    </div>
  );
}
