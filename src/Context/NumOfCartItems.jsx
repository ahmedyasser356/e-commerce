import React, { createContext, useState } from "react";

export let numOfCartItemsContext = createContext(0);

export default function NumOfCartItemsBrovider({ children }) {
  let [numOfCartItems, setNumOfCartItems] = useState(0);

  return (
    <numOfCartItemsContext.Provider
      value={{ numOfCartItems, setNumOfCartItems }}
    >
      {children}
    </numOfCartItemsContext.Provider>
  );
}
