import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  
  selectCurrentUser,
} from "../store/services/authSlice";


const PrivateRouter = ({ allowedRoles }) => {
  const user = useSelector(selectCurrentUser);

 
  if (!user) {
    console.log("private")
    return <Navigate to="/login" />;
  }

  // if (!allowedRoles.includes(user.role)) {
  //   console.log("unothorized")
  //   return <Navigate to="/unauthorized" />;
  // }

  return <Outlet />;
};


export default PrivateRouter;
