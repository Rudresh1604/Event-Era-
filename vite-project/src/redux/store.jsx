import { combineReducers, configureStore } from "@reduxjs/toolkit";
import rootSlice from "./rootSlice.jsx";
const reducer = combineReducers({
  root: rootSlice,
});

const store = configureStore({ reducer });

export default store;
