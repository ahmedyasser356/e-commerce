import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";

export default function VerfiyCode() {
  let navigate = useNavigate();
  // mutation verify code
  function verifyFn(resetCode) {
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
      { resetCode }
    );
  }
  let { mutate, data, error, isError, isSuccess, isPending } = useMutation({
    mutationKey: ["verifyCode"],
    mutationFn: verifyFn,
  });
  // successfully verification code
  if (isSuccess) {
    navigate("/reset-password");
  }
  // ===================
  let { em } = useParams();
  // formik
  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: handleVerification,
  });

  function handleVerification(values) {
    mutate(values.resetCode.replaceAll(" ", ""));
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>verify code</title>
      </Helmet>
      <div className="md:w-2/3 mx-auto">
        <h4 className="text-h4 font-bold my-5 ">Enter verification code</h4>
        <p className="text-gray-700 dark:text-gray-400 text-sm">
          we have sent a code to{" "}
          <span className="text-black dark:text-white font-extrabold">
            {em}
          </span>
        </p>
        <p></p>
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto py-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              id="resetCode"
              onChange={formik.handleChange}
              value={formik.values.resetCode}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="resetCode"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Code
            </label>
          </div>
          {isError && (
            <div
              class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span class="font-medium"></span>
              {error.response.data.message}
            </div>
          )}
          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isPending ? (
              <i class="fa-solid fa-spinner animate-spin"></i>
            ) : (
              "Verify"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
