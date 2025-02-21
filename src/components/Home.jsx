import React, { useEffect, useState } from "react";
import FeaturedProducts from "./FeaturedProducts";
import Header from "./Header";
import Categories from "./Categories";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home Page</title>
      </Helmet>
      <Header />
      <Categories />
      <FeaturedProducts />
    </>
  );
}
