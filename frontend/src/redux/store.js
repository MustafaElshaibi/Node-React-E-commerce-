import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./api/api";
import  authSlice from "./features/authSlice";
import errorMiddleware from "./middleware/errorMiddleware";
import errorSlice from './features/errorSlice';


 const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authSlice,
    error: errorSlice
  },

  middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(api.middleware).concat(errorMiddleware),
  devTools: true,
})

setupListeners(store.dispatch);

export default store;