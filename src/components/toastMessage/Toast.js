import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectErrorMessage,
  setErrorMessage,
} from "../../store/services/mainSlice";

const Toast = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(selectErrorMessage);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        dispatch(setErrorMessage(""));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage, dispatch]);

  if (!errorMessage) return null;
  return (
    <div className="fixed bottom-12 right-4 bg-white  text-default text-xs font-medium px-4 py-2 rounded shadow-custom z-[900]">
      {/* {errorMessage.replace(/[()]/g, "")} */}
      Bir Hata Oluştu...
      {/* Progress Bar */}
      <div className="w-full h-1 bg-lightkozy mt-2 overflow-hidden">
        <div className="h-full bg-red-500 progress-bar"></div>
      </div>
    </div>
  );
};

export default Toast;
