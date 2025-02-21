import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
export default function ForgetPassword() {
  let navigate = useNavigate();
  // send email and  verfy
  let { data, isError, isPending, error, isSuccess, mutate } = useMutation({
    mutationKey: ["sendingToEmail"],
    mutationFn: verifyFn,
  });

  function verifyFn(email) {
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
      { email }
    );
  }
  function handleVerify(values) {
    mutate(values.email);
  }

  // validation
  let validationSchema = Yup.object().shape({
    email: Yup.string().email("invaild email").required("email is required"),
  });
  // formik
  let formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: handleVerify,
    validationSchema,
  });

  if (isSuccess) {
    navigate(`/verify-code/${formik.values.email}`);
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>forget password Page</title>
      </Helmet>
      {/* =================================================================== */}

      <div className="md:w-2/3 mx-auto">
        <h4 className="text-h4 font-bold my-5 ">Please Enter Your Email</h4>
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto py-4">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              id="email"
              onBlur={formik.handleBlur}
              value={formik.values.email}
              onChange={formik.handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
          {formik.errors.email && formik.touched.email && (
            <div
              class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span class="font-medium"></span>
              {formik.errors.email}
            </div>
          )}
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
