import React from "react";
import { Helmet } from "react-helmet";
import Loader2 from "./Loader2";
import useQueryWishList from "../Hooks/useQueryWishList";
import useMutatioWishList, {
  deleteFromWishList,
} from "../Hooks/useMutatioWishList";
import useMutationCart, { addToCart } from "../Hooks/useMutationCart";
import toast from "react-hot-toast";

export default function WishList() {
  let { data, isError, isSuccess, error, isLoading } = useQueryWishList();
  let {
    data: dataAfterDelete,
    isPending,
    mutate,
  } = useMutatioWishList(deleteFromWishList);
  let {
    mutate: mutaeAddToCart,
    data: dataAdd,
    isSuccess: isSuccessAddToCart,
  } = useMutationCart(addToCart);
  // add to cart  (add to cart then delete from wish list)
  function handleAddToCart(id) {
    mutaeAddToCart(id);
    mutate(id);
  }
  if (isSuccessAddToCart)
    toast.success(dataAdd?.data?.message, {
      position: "top-right",
      style: { backgroundColor: "green", color: "white" },
      duration: 4000,
    });

  if (isPending) return <Loader2></Loader2>;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>wish list Page</title>
      </Helmet>
      {/* //================ */}

      {isLoading ? (
        <Loader2></Loader2>
      ) : (
        <div className="bg-light-color mt-10 overflow-hidden dark:bg-black dark:bg-opacity-20 p-8 md:p-10 rounded-lg pb-5">
          <h3 className="text-h3 font-bold">My Wish List </h3>
          <div className="box-carts flex flex-col mt-9 gap-4">
            {/* item */}
            {data?.map((prod) => {
              return (
                <div className="card-item-shop w-full   flex flex-wrap items-center border-b gap-y-4 border-b-gray-300 pb-4">
                  <img
                    src={prod.imageCover}
                    className="md:w-[15%]   object-cover px-3"
                  />
                  <div className="md:w-[85%]   w-full gap-y-3 px-3 flex flex-wrap justify-between">
                    <div className="w-[75%]  ">
                      <h5 className="text-[1rem] font-bold">{prod.title}</h5>

                      <p
                        className={`my-2 font-semibold text-[13px] ${
                          prod.priceAfterDiscount && "line-through"
                        }`}
                      >
                        {prod.price} EGP
                      </p>
                      {prod.priceAfterDiscount ? (
                        <p className="my-2 font-semibold text-[13px]">
                          {prod.priceAfterDiscount} EGP
                        </p>
                      ) : (
                        ""
                      )}

                      <button
                        onClick={() => {
                          mutate(prod._id);
                        }}
                        className="text-red-600 font-bold text-[14px]"
                      >
                        <i className="fa-solid fa-trash-can"></i> Remove
                      </button>
                    </div>
                    <div className="  w-[25%]  justify-end flex gap-3 items-center">
                      <button
                        onClick={() => {
                          handleAddToCart(prod._id);
                        }}
                        className="border border-main-color border-solid px-3 py-2 rounded-lg"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
