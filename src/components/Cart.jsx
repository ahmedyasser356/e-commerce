import React, { useContext, useEffect } from "react";
import emptyCart from "../assets/images/empty-cart.png";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader2 from "./Loader2";
import useQueryCart, { getUserCart } from "../Hooks/useQueryCart";
import useMutationCart, {
  ClearAllCart,
  deleteCart,
  updateCount,
} from "../Hooks/useMutationCart";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { numOfCartItemsContext } from "../Context/NumOfCartItems";
import { Helmet } from "react-helmet";

export default function Cart() {
  let { numOfCartItems, setNumOfCartItems } = useContext(numOfCartItemsContext);

  // update count item
  let { mutate: updateCountMutate, isPending: isPendingUpdate } =
    useMutationCart(updateCount);

  // delete cart
  let {
    mutate: mutateDelete,
    isSuccess,
    isPending,
  } = useMutationCart(deleteCart);
  let { data, isLoading, error, refetch, isError, isFetching } =
    useQueryCart(getUserCart);
  let { mutate, isPending: isPendingClear } = useMutationCart(ClearAllCart);

  // set refetch context

  setNumOfCartItems(data?.numOfCartItems);
  if (isLoading) return <Loader2 />;

  if (isPending || isPendingClear || isPendingUpdate) return <Loader2 />;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart Shop</title>
      </Helmet>

      {data?.data?.products.length === 0 ? (
        <img src={emptyCart} alt="" className="mx-auto" />
      ) : (
        <div className="bg-light-color mt-10 overflow-hidden dark:bg-black dark:bg-opacity-20 p-8 md:p-10 rounded-lg pb-5">
          <div className="mb-7 flex flex-wrap justify-between items-baseline">
            <h3 className="text-h3 font-bold">Cart Shop</h3>
            <Link
              to={`/check-out/${data?.cartId}`}
              className="bg-blue-600 hover:text-white px-4 py-3 hover:bg-blue-700 duration-200 text-white rounded-xl text-xl"
            >
              check out
            </Link>
          </div>
          <div className="flex flex-wrap justify-between gap-3 items-baseline">
            <p className="text-[18px] font-semibold">
              Total Price :{" "}
              <span className="text-main-color">
                {data?.data?.totalCartPrice}
              </span>
            </p>
            <p className="text-[18px] font-semibold">
              Total Number Of Items :{" "}
              <span className="text-main-color">{data?.numOfCartItems}</span>
            </p>
          </div>
          <div className="box-carts flex flex-col mt-9 gap-4">
            {data?.data?.products.map((prod) => (
              <div
                key={prod._id}
                className="card-item-shop w-full flex flex-wrap items-center border-b gap-y-4 border-b-gray-300 pb-4"
              >
                <img
                  src={prod.product.imageCover}
                  className="md:w-[15%] object-cover px-3"
                />
                <div className="md:w-[85%] w-full gap-y-3 px-3 flex flex-nowrap justify-between">
                  <div>
                    <h5 className="text-[1rem] font-bold">
                      {prod.product.title}
                    </h5>
                    <p className="my-2 font-semibold text-[13px]">
                      {prod.price} EGP
                    </p>
                    <button
                      onClick={() => {
                        mutateDelete(prod.product.id);
                      }}
                      className="text-red-600 font-bold text-[14px]"
                    >
                      <i className="fa-solid fa-trash-can"></i> Remove
                    </button>
                  </div>
                  <div className="counter flex gap-3 items-center">
                    <button
                      onClick={() => {
                        updateCountMutate({
                          id: prod.product.id,
                          count: prod.count + 1,
                        });
                      }}
                      className="border border-main-color border-solid px-3 py-1 rounded-lg"
                    >
                      +
                    </button>
                    <p>{prod.count}</p>
                    <button
                      onClick={() => {
                        updateCountMutate({
                          id: prod.product.id,
                          count: prod.count - 1,
                        });
                      }}
                      className="border border-main-color border-solid px-3 py-1 rounded-lg"
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button
              onClick={mutate}
              className="border rounded-lg px-3 mt-7 py-2 border-main-color"
            >
              Clear Your Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
}
