import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../store/services/authSlice";

// Dispatch hook'u
export const useAppDispatch = () => useDispatch();

// useAuth custom hook'u
export const useAuth = () => {
  const user = useSelector(selectCurrentUser);
  return user;
};