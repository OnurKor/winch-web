import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPageName,
  setPageName,
  selectMenuSize,
  setMenuSize,
} from "../../store/services/mainSlice";
import { useNavigate } from "react-router";
import { CgMenuLeftAlt } from "react-icons/cg";
import turna from "../../assets/logo/logo.jpeg";
import Avatar from "./Avatar";
import { logOut, selectCurrentUser } from "../../store/services/authSlice";
import Cookies from "universal-cookie";
import { useLogoutMutation } from "../../store/services/authApi";
import { motion, AnimatePresence } from "framer-motion";
const SideBar = ({ tabs }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logOutUser] = useLogoutMutation();
  const pageName = useSelector(selectPageName);
  const menuSize = useSelector(selectMenuSize);
  const user = useSelector(selectCurrentUser);
  const [outhUser, setOuthUser] = useState(false);
  const [isSubTitleOpen, setIsSubTitleOpen] = useState(false);
  const cookies = new Cookies();
  const handleLogOut = async () => {
    try {
      const logoutResponse = await logOutUser()
        .unwrap()
        .then((res) => {
          navigate("/login");
          dispatch(logOut());
        });
    } catch (logoutError) {
      navigate("/login");
      dispatch(logOut());
    }
  };
  return (
    <div
      className={`${
        menuSize === "large" ? " w-64 " : "w-20"
      } transition-all duration-400 sticky top-0 left-0 h-[100vh] z-40 shadow-lg lg:block hidden bg-white `}
    >
      <div
        className="h-16 hidden lg:flex justify-center items-center relative"
        onClick={() =>
          dispatch(setMenuSize(menuSize === "large" ? "small" : "large"))
        }
      >
        <img
          src={turna}
          alt=""
          className={`${menuSize === "large" ? "w-20" : "w-12 rounded-lg"}`}
        />
        <CgMenuLeftAlt className="text-3xl absolute -right-4 bg-lightkozy shadow-lg rounded-md text-white transition-transform duration-500 hover:scale-125 hover:rotate-180 " />
      </div>

      <div className="flex flex-col  h-[86.5%] overflow-y-auto hide-scrollbar">
        {tabs?.map((item, index) => {
          return (
            <>
              <div key={index} className="px-3 mt-2 ">
                {menuSize === "large" && item.poKey !== "" && (
                  <p className="mt-4 text-lightkozy ml-[10px] text-sm ">
                    {item.poKey}
                  </p>
                )}
                {item.subTitle.map((firstSubtitle, index) => {
                  return (
                    <>
                      <div
                        className={`${
                          pageName === firstSubtitle.name ? "bg-[#F4F6FA]" : ""
                        }  flex justify-start items-center mt-1 gap-3 p-2 rounded-lg text-default hover:text-default cursor-pointer`}
                        key={index}
                        onClick={() => {
                          // Eğer alt başlık varsa ve öğe sayısı 0'dan büyükse, alt başlıklar açılacak
                          if (
                            firstSubtitle.subTitle &&
                            firstSubtitle.subTitle.length > 0
                          ) {
                            // Alt başlıkları aç/kapat
                            setIsSubTitleOpen(!isSubTitleOpen);
                          } else {
                            dispatch(setPageName(firstSubtitle.name));
                            navigate(firstSubtitle.route);
                          }
                        }}
                      >
                        <firstSubtitle.icon
                          className="text-default"
                          size={26}
                        />
                        {menuSize === "large" && (
                          <p className="text-center mt-1 text-sm text-default">
                            {firstSubtitle.name}
                          </p>
                        )}
                      </div>

                      {/* Animasyonlu Alt Başlıklar */}
                      <AnimatePresence>
                        {isSubTitleOpen &&
                          firstSubtitle.subTitle &&
                          firstSubtitle.subTitle.length > 0 && (
                            <motion.div
                              key="subTitle"
                              className="pl-4 mt-2"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {firstSubtitle.subTitle.map(
                                (subItem, subIndex) => (
                                  <div
                                    key={subIndex}
                                    className="flex justify-start items-center gap-3 p-2 rounded-lg text-default hover:text-default cursor-pointer"
                                    onClick={() => {
                                      dispatch(setPageName(subItem.name));
                                      navigate(subItem.route);
                                    }}
                                  >
                                    <subItem.icon
                                      className="text-default"
                                      size={26}
                                    />
                                    {menuSize === "large" && (
                                      <p className="text-center mt-1 text-sm text-default">
                                        {subItem.name}
                                      </p>
                                    )}
                                  </div>
                                )
                              )}
                            </motion.div>
                          )}
                      </AnimatePresence>
                    </>
                  );
                })}
              </div>
            </>
          );
        })}
      </div>
      <div className="absolute bottom-0 left-0 h-16 border-t border-gray-200 w-full flex justify-between  pl-4 items-center gap-4 ">
        <div
          onMouseOver={() => setOuthUser(true)}
          onMouseLeave={() => setOuthUser(false)}
          onClick={handleLogOut}
          className="cursor-pointer"
        >
          <Avatar username={user?.name} />
        </div>
        {menuSize !== "small" && (
          <div className="flex flex-col gap-[1px] items-center justify-center mb-2 mr-4">
            <span className="h-1 flex justify-center items-center text-title-medium rotate-90 mt-2 text-lightkozy">
              ...
            </span>
          </div>
        )}
        {outhUser && (
          <div className="absolute bottom-12 left-8 bg-white px-3 py-1 rounded shadow ">
            Log Out
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
