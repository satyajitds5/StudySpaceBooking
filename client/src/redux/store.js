import { combineReducers, configureStore } from "@reduxjs/toolkit";
import alertsSlice from "./alertsSlice";
import usersSlice from "./usersSlice";

// A store that holds the application state
const rootReducer = combineReducers({
  alerts: alertsSlice,
  users: usersSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;