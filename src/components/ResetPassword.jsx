import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import * as motion from "motion/react-client";
export default function ResetPassword() {
  //  reset password (use mutation)
  function resetFn({ email, newPassword }) {
    return axios.put(
      `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
      {
        email,
        newPassword,
      }
    );
  }
  let { mutate, isPending, isError, error, isSuccess, data } = useMutation({
    mutationFn: resetFn,
  });
  // validation
  let validationSchema = Yup.object().shape({
    email: Yup.string().email("invaild email").required("email is required"),
    newPassword: Yup.string()
      .required("password is required")
      .matches(
        /^[A-Z][a-zA-Z0-9]{5,13}/,
        "at least 6 character and first letter capital"
      ),
  });
  // formik
  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: resetPassword,
    validationSchema,
  });
  // reset password
  function resetPassword(values) {
    mutate({ email: values.email, newPassword: values.newPassword });
  }
  if (isSuccess) {
    formik.values.email = "";
    formik.values.newPassword = "";
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Reset Password</title>
      </Helmet>
      {/* ===================== */}

      <div className="md:w-2/3 mx-auto">
        <h4 className="text-h4 font-bold my-5 ">Reset your account password</h4>
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto py-5">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
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
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              id="newPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="newPassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              New Password
            </label>
          </div>
          {formik.errors.newPassword && formik.touched.newPassword && (
            <div
              class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span class="font-medium"></span>
              {formik.errors.newPassword}
            </div>
          )}
          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isPending ? (
              <i class="fa-solid fa-spinner animate-spin"></i>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>

      {/* success resetpassword  */}
      {isSuccess && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
          }}
        >
          <div className="flex flex-col mx-auto md:w-[60%] w-[70%] gap-5 justify-center mt-6 items-center">
            <i class="fa-solid fa-circle-check text-4xl text-main-color"></i>
            <p className="text-h4 text-center">Password Changed!</p>
            <p className="text-gray-700 dark:text-gray-400 text-center text-sm">
              your password has been changed successfully.
            </p>
          </div>
        </motion.div>
      )}
    </>
  );
}
