// src/features/authSlice.js

import { createSlice } from "@reduxjs/toolkit";

// localStorage'dan başlangıç değerlerini al
const storedAccessToken = localStorage.getItem("accessToken");
const storedUser = localStorage.getItem("user");

const initialState = {
  accessToken: storedAccessToken ? JSON.parse(storedAccessToken) : null,
  user: storedUser ? JSON.parse(storedUser) : null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { bearer, user } = action.payload;
      state.accessToken = bearer;
      state.user = user;
      localStorage.setItem("accessToken", JSON.stringify(bearer));
      localStorage.setItem("user", JSON.stringify(user));
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.accessToken = null;

      // localStorage'dan temizle
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions; // setCredentials'i dışa aktarın
export default authSlice.reducer; // Reducer'ı dışa aktarın

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.accessToken;
