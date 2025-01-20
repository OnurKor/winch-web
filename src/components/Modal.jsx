import React from "react";

const Modal = ({ item, setOpenModal, children, title ,size="large"}) => {
  console.log(size)
  return (
    <div className=" fixed -top-8 left-0 w-full h-screen px-8 z-40  ">
      <div
        className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#2b7eab] z-[50] opacity-20"
        onClick={() => setOpenModal(false)}
      ></div>
      <div className={`${size === "small" ? "w-[90%] lg:w-[40%]" : "w-[90%] lg:w-[80%]"} max-h-[90%] overflow-y-auto absolute top-[50%] left-[50%]  z-[8000] text-black -translate-x-1/2 -translate-y-1/2  bg-whitekozy  min-h-[200px] py-4 px-8 rounded-[8px] shadow-md`}>
        <div className="flex justify-between">
          <div className="text-title-medium font-semibold  mb-4 text-lightkozy">
            {title}
          </div>
          <div className="cursor-pointer font-semibold text-title-small text-lightkozy " onClick={() => setOpenModal(false)}>x</div>
        </div>
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

