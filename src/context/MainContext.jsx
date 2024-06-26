import React, { createContext, useContext, useEffect, useState } from "react";

const MainContext = createContext();

export const useMainContext = () => {
  const context = useContext(MainContext);

  if (!context) {
    throw new Error(
      "useMainContext must be used within a MainProvider"
    );
  }
  return context;
};

export const MainProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <MainContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
