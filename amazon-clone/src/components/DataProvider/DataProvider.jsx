

import React, { createContext, useReducer } from "react";
import PropTypes from "prop-types";

// Create Context
export const DataContext = createContext();

// Initial State
const defaultInitialState = {
  basket: [],
};

// Provider Component
export const DataProvider = ({ children, reducer, initialState = defaultInitialState }) => {
  if (!reducer) {
    throw new Error("DataProvider requires a reducer function.");
  }

  return (
    <DataContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </DataContext.Provider>
  );
};

// Prop Types
DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
  reducer: PropTypes.func.isRequired,
  initialState: PropTypes.object,
};
