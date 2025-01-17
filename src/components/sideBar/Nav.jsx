import React, { useState } from "react";
import userLogo from "../../assets/logo/blank.png";
import hamburger from "../../assets/logo/hamburger.svg";
import turna from "../../assets/logo/logo.jpeg";
import { BsSun } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { selectMenuSize, selectPageName, setPageName, setTheme, setThemeMenu } from "../../store/services/mainSlice";
import { themeTabs } from "../../tabs/themeTabs";
import { AnimatePresence, motion } from "framer-motion";
import { selectCurrentUser } from "../../store/services/authSlice";
import { clientTabs, superAdminTabs } from "../../tabs/superAdminTabs";
import { useNavigate } from "react-router-dom";
import { leftMenuTabs } from "../../tabs/leftMenuTabs";

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pageName = useSelector(selectPageName);
  const menuSize = useSelector(selectMenuSize);

  const [viewSideBar, setViewSideBar] = useState(false);
  const { themeMenu } = useSelector((state) => state.main);
  const user = useSelector(selectCurrentUser);
  const tabs = user.role === "super_admin" ? superAdminTabs : user.role === "admin" ? leftMenuTabs : clientTabs;


  return (
    <>
      <div className="flex justify-between lg:justify-end items-center h-16 relative bg-white ">
        <div className="lg:hidden flex px-4 ">
          <img
            src={hamburger}
            alt=""
            className="w-6 mr-4 border"
            onClick={() => setViewSideBar(!viewSideBar)}
          />
          <img src={turna} alt="" className="w-24 rounded-lg" />
        </div>
        <div className="flex justify-center items-center gap-4 px-4 py-3">
          <BsSun
            className="text-2xl font-bold text-lightkozy cursor-pointer"
            onClick={() => dispatch(setThemeMenu(!themeMenu))}
          />
          <img src={userLogo} alt="" className="w-10 rounded-lg" />
          {themeMenu && (
            <div
              onClick={() => console.log("object")}
              className="z-50 absolute top-12 right-16 custom-animation cursor-pointer bg-white w-40 shadow-lg h-40 rounded-2xl flex justify-center items-center flex-col gap-4 text-[#B7B8BB]"
            >
              {themeTabs.map((item, index) => (
                <div
                  className="flex w-[90%] gap-2 justify-start items-center rounded-lg py-1"
                  key={index}
                  onClick={() => console.log("object")}
                >
                  <item.icon size={16} />
                  <div onClick={() => console.log("object")}>{item.poKey}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <AnimatePresence>
        {viewSideBar && (
          <motion.div
          initial={{ opacity: 0, x: "-100vw" }}  // Başlangıçta dışarıda
          animate={{ opacity: 1, x: 0 }}  // Animasyonla ekrana gelsin
          exit={{ opacity: 0, x: "-100vw" }}  // Çıkarken sol tarafa kayacak
          transition={{ duration: 0.5 }}
          className="fixed top-0 left-0 w-[50%] h-[100vh] z-[10000000] flex bg-white border flex-col justify-center items-start"
          >
            {tabs?.map((item, index) => {
          return (
            
            <div key={index} className="px-3 mt-2 flex flex-col justify-center items-start  w-full">
              
              {item.subTitle.map((item, index) => {
                return (
                  <div
                    className={`${
                      pageName === item.name ? "bg-[#F4F6FA] text-blue-500" : ""
                    }  flex justify-start items-center mt-1 gap-3 p-2 rounded-lg text-[#B7B8BB] hover:text-blue-500 cursor-pointer  w-full`}
                    key={index}
                    onClick={() => {
                      dispatch(setPageName(item.name));
                      navigate(item.route);
                      setViewSideBar(!viewSideBar)
                    }}
                  >
                    <item.icon className="" size={26} />
                    {menuSize === "large" && (
                      <p className="text-center mt-1 text-sm">{item.name}</p>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;
