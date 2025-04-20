import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeMenu: false,
  leftMenu: { menuSize: "large" },
  pageInfo: { pageName: "Home" },
  theme: "Light",
  editModal: false,
  errorMessage: "",
  day: { firstDay: "", secondDay: "" },
  lang_code: "English",
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setThemeMenu: (state, action) => {
      state.themeMenu = action.payload;
    },
    setMenuSize: (state, action) => {
      state.leftMenu.menuSize = action.payload;
    },
    setPageName: (state, action) => {
      state.pageInfo.pageName = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setEditModal: (state, action) => {
      state.editModal = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setDay: (state, action) => {
      state.day = action.payload;
    },
    setLangCode: (state, action) => {
      state.lang_code = action.payload;
    },
  },
});

export const {
  setUser,
  setThemeMenu,
  setMenuSize,
  setPageName,
  setTheme,
  setEditModal,
  setErrorMessage,
  setDay,
  setLangCode,
} = mainSlice.actions;

export default mainSlice.reducer;

export const selectMenuSize = (state) => state.main.leftMenu.menuSize;

export const selectPageName = (state) => state.main.pageInfo.pageName;

export const selectTheme = (state) => state.main.theme;
export const selectEditModal = (state) => state.main.editModal;
export const selectErrorMessage = (state) => state.main.errorMessage;
export const selectDay = (state) => state.main.day;

export const selectLang_code = (state) => state.main.lang_code;
