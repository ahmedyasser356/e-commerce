import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userToken } from "../Context/UserTocken";
import { Helmet } from "react-helmet";
import { useMutation } from "@tanstack/react-query";

export default function Login() {
  let { setLogin } = useContext(userToken);

  let [noInternet, setNoInternet] = useState(false);
  let navigate = useNavigate();

  // handle login ================
  function loginFn(values) {
    return axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signin",
      values
    );
  }

  let { data, mutate, isSuccess, isPending, error, isError } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginFn,
  });

  if (isSuccess) {
    setLogin(data.data.token);
    localStorage.setItem("token", data.data.token);
    navigate("/cart");
  }
  function handleLogin(values) {
    mutate(values);
  }
  //=======================
  let validationSchema = Yup.object().shape({
    email: Yup.string().email("invalid email").required("email is required"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^[A-Z][a-zA-Z0-9]{5,13}/,
        "at least 6 character and first letter capital"
      ),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleLogin,
    validationSchema,
  });
  return (<>
    <div className="md:w-2/3 mx-auto">
      <h3 className="text-h4 my-5 font-bold">Login Now :</h3>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login Page</title>
      </Helmet>

      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto py-4">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        {formik.errors.password && formik.touched.password && (
          <div
            class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span class="font-medium"></span>
            {formik.errors.password}
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
        <div className="w-full">
          <button
            onClick={() => {
              navigate("/forgetpassword");
            }}
            className="text-sm font-bold hover:text-main-color"
          >
            forget your password ?
          </button>
        </div>
        <button
          type="submit"
          className="text-white mt-5 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto
   px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          {isPending ? (
            <i className="fa-solid fa-spinner animate-spin"></i>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>

</> );
}
