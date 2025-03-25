import React from "react";
import { Outlet } from "react-router";
import Footer from "../../components/Footer";
import { leftMenuTabs } from "../../tabs/leftMenuTabs";
import Nav from "../../components/sideBar/Nav";
import SideBar from "../../components/sideBar/SideBar";

const Home = () => {
  return (
    <div className="flex h-full w-full">
      <div className="h-full">
        <div className="sticky top-0 left-0 z-10 ">
          <SideBar tabs={leftMenuTabs} />
        </div>
      </div>

      <div className="w-full border h-full flex flex-col flex-1 bg-[#F5F8FA] overflow-auto">
        <Nav />
        <div className="w-full flex flex-col relative flex-1 mb-4">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
