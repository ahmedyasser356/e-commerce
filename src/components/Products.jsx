import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Loader2 from "./Loader2";

import { Helmet } from "react-helmet";
import FeaturedProducts from "./FeaturedProducts";

export default function Products() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Products Page</title>
      </Helmet>
      <FeaturedProducts />
    </>
  );
}
