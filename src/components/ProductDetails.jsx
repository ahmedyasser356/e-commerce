import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import CardItem from "./CardItem";
import Loader2 from "./Loader2";
import Slider from "react-slick";
import useMutationCart, { addToCart } from "../Hooks/useMutationCart";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import useQueryWishList from "../Hooks/useQueryWishList";
import useMutatioWishList, { addToWishList } from "../Hooks/useMutatioWishList";

export default function ProductDetails() {
  let { id, catId } = useParams();
  let { data: dataWishList, isPending: isPendingGetWishList } =
    useQueryWishList();
  // add to wish list
  let {
    data: dataAddToWishList,
    mutate: MutateAddToWishCart,
    isSuccess: isSuccessAddToWishList,
  } = useMutatioWishList(addToWishList);
  if (isSuccessAddToWishList) {
    toast.success(dataAddToWishList.data.message, {
      position: "top-right",
      style: { backgroundColor: "green", color: "white" },
      duration: 4000,
    });
  }

  function getProduct() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  let {
    data: data1,
    isError: isError1,
    error: error1,
    isSuccess: isSuccess1,
    isLoading: isLoading1,
  } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: getProduct,
    select: (data1) => data1.data.data,
  });

  useEffect(() => {
    getRelatedProd();
  }, []);
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  let [relatedProdArr, setRelatedProdArr] = useState([]);
  async function getRelatedProd() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?category[in]=${catId}`
      );
      setRelatedProdArr(data.data);
    } catch (error) {}
  }

  let { isError, isSuccess, data, error, mutate } = useMutationCart(addToCart);
  if (isSuccess) {
    toast.success(data?.data?.message, {
      position: "top-right",
      style: { backgroundColor: "green", color: "white" },
      duration: 4000,
    });
  }
  if (isError) {
    toast.error(error.response.data.message);
  }
  return (
    <>
      {isLoading1 ? (
        <Loader2 />
      ) : (
        <>
          <div className="details-page flex gap-y-7 pb-16    flex-wrap mt-6 items-center">
            <Slider {...settings} className="w-full   md:w-1/3">
              {data1?.images.map((item) => {
                return <img src={item} alt="" />;
              })}
            </Slider>
            <div className="w-full md:w-2/3 px-5">
              <h3 className="text-h3 font-bold">{data1?.title}</h3>
              <p className="mt-2 text-base">{data1?.description}</p>
              <div className="flex flex-wrap justify-between mt-3">
                <div className="flex flex-col font-semibold">
                  {data1?.priceAfterDiscount ? (
                    <>
                      <p className="line-through">{data1?.price} EGP</p>
                      <p>{data1?.priceAfterDiscount} EGP</p>
                    </>
                  ) : (
                    <p>{data1?.price} EGP</p>
                  )}
                </div>
                <div className="font-semibold">
                  <i className="fa-solid fa-star text-rating-color"></i>{" "}
                  {data1?.ratingsAverage}
                </div>
              </div>
              <div className=" flex items-baseline   mt-7">
                <button
                  onClick={() => {
                    mutate(data1?._id);
                  }}
                  className="bg-main-color hover:bg-opacity-85 w-full text-white  mx-auto  py-2 px-2 rounded-lg"
                >
                  + Add
                </button>
                <i
                  onClick={() => {
                    MutateAddToWishCart(id);
                  }}
                  className={`fa-solid fa-heart ms-10 text-gray-500 cursor-pointer text-2xl ${
                    dataWishList
                      ?.map((prod) => {
                        return prod._id;
                      })
                      .includes(id) && "text-red-600"
                  }`}
                ></i>
              </div>
            </div>
          </div>
          <div className="top-rated">
            <h5 className="text-h5 font-semibold pb-6">Top Related</h5>
            <div className="flex flex-wrap gap-y-4 pb-10">
              {relatedProdArr.map(function (prod) {
                return (
                  <CardItem
                    key={prod._id}
                    wishList={dataWishList?.map((prod) => {
                      return prod._id;
                    })}
                    prod={prod}
                  />
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}
