import { configureStore } from "@reduxjs/toolkit";
import { mainApi } from "./services/mainApi";
import mainReducer from "./services/mainSlice";
import authReducer from "./services/authSlice";
import { authApi } from "./services/authApi";

export const store = configureStore({
  reducer: {
    [mainApi.reducerPath]: mainApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    main: mainReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([mainApi.middleware, authApi.middleware]),
});
